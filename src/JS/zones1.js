//Глобальный объект zones и images
//Woreker следит за временем и заполняет список изображений(5 штук), проходит по списку изображений и проверяет, выщло ли время на существование
//если да, перерисовать
import { zones } from '../main'
export class Zones {
    constructor(zones, images) {
        this.initData(zones, images)
        this.initImages()
        this.generateImages()
        window.setInterval(this.randomImages, 1000)
    }

    initData() {
        this.zones = zones
        this.images = images
        this.imageActivelist = []
    }

    initImages() {
        for (let i = 0; i < 6; i++) {
            const objImg = {
                time: 0,
                imageN: 0,
                active: false,
                x: 0,
                y: 0,
            }
            this.imageActivelist.push(objImg)
        }
    }

    generateImages() {
        const $zones = document.querySelector('.zones')
        this.imageActivelist.forEach((_, index) =>
            $zones.insertAdjacentHTML('afterbegin', `<img id="img${index}" class="hide"></img>`))
    }

    randomImages() {
        let wasModified = 0
        let maxCount = zones.getRandom(1, 3)
        for (let index = 0; index < zones.imageActivelist.length; index++) {
            const element = zones.imageActivelist[index]
            if (element.time > 5000) {
                hideImg(index)
                setProperties(element, 0, false, 0, 0)
                continue
            }
            if (element.time === 0 && wasModified < maxCount) {   
                const randomImg = getImgNumber(element);
                const activeZone = zones.getZoneById(randomImg.zoneId, zones.zones)
                const x = zones.getCorrectCoordinates(activeZone.x1, activeZone.x2, 'x', zones.imageActivelist)
                if (x === -1) continue
                const y = zones.getCorrectCoordinates(activeZone.y1, activeZone.y2, 'y', zones.imageActivelist)
                if (y === -1) continue
                setProperties(element, 1, true, x, y)
                showImg(index, randomImg.src, x, y)
                wasModified++
            }
            element.active && (element.time += 1000)
        }
    }

    getImgNumber(element) {
        let randomImg
        while (true) {
            let isOk = true
            const num = zones.getRandom(0, zones.images.length)
            randomImg = zones.images[num]
            for (let i = 0; i < zones.imageActivelist.length; i++) {
                if (zones.imageActivelist[i].imageN === num) {
                    isOk = false
                    break
                }
            }
            if (isOk === true) {
                element.imageN = num
                break
            }
        }
        return randomImg
    }

    setProperties(element, time, active, x, y) {
        element.time = time
        element.active = active
        element.x = x
        element.y = y
    }

    hideImg(index) {
        const $img = document.querySelector(`#img${index}`)
        $img.classList?.add('hide')
    }

    showImg(index, src, x, y) {
        const $img = document.querySelector(`#img${index}`)
        if ($img) {
            $img.src = src
            $img.style.left = x + 'px'
            $img.style.top = y + 'px'
            $img.classList.remove('hide')
        }
    }

    getCorrectCoordinates(c1, c2, axis, imageActiveList) {
        for (let i = 0; i < 30; i++) {
            let isOk = true
            const c = zones.getRandom(c1, c2)
            for (let g = 0; g < imageActiveList.length; g++) {
                const elem = imageActiveList[g]
                if (elem[axis] + 60 > c && elem[axis] - 60 < c) {
                    isOk = false
                    break
                }
            }
            if (isOk === true) {
                return c
            }
        }
        return -1
    }

    getZoneById(id, zonesList) {
        const zone = zonesList[id - 1]
        if (zone.length < 1) {
            return zone[0]
        } else {
            return zone[zones.getRandom(0, zone.length)]
        }
    }

    getRandom(min, max) {
        return Math.floor(Math.random() * (max - min)) + min
    }
}