//Глобальный объект zones и images
//Woreker следит за временем и заполняет список изображений(5 штук), проходит по списку изображений и проверяет, выщло ли время на существование
//если да, перерисовать
import { zones } from '../main'
export class Zones {
    constructor(zones, images) {
        this.zones = zones
        this.images = images
        this.imageActivelist = []

        const $zones = document.querySelector('.zones')
        for (let i = 0; i < 6; i++) {
            const objImg = {
                time: 0,
                imageN: 0,
                active: false,
                x: 0,
                y: 0,
            }
            this.imageActivelist.push(objImg)
            $zones.insertAdjacentHTML('afterbegin', `<img id="img${i}" class="hide"></img>`)
        }
        window.setInterval(this.randomImages, 1000)
    }

    randomImages() {
        let wasModified = 0
        let maxCount = zones.getRandom(1, 3)
        for (let index = 0; index < zones.imageActivelist.length; index++) {
            const element = zones.imageActivelist[index]
            if (element.time > 5000) {
                const $img = document.querySelector(`#img${index}`)
                $img.classList.add('hide')
                element.time = 0
                element.active = false
                element.x = 0
                element.y = 0
                continue
            }
            if (element.time === 0 && wasModified < maxCount) {
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
                const $img = document.querySelector(`#img${index}`)
                const zone = zones.zones[randomImg.zoneId - 1]
                const activeZone = zone.length < 1 ? zone[0] : zone[zones.getRandom(0, zone.length)]
                const x = zones.getCorrectCoordinates(activeZone.x1, activeZone.x2, 'x', zones.imageActivelist)
                if (x === -1) continue
                const y = zones.getCorrectCoordinates(activeZone.y1, activeZone.y2, 'y', zones.imageActivelist)
                if (y === -1) continue
                element.x = x
                element.y = y
                element.time = 1
                element.active = true
                wasModified += 1
                $img.src = randomImg.src
                $img.style.left = x + 'px'
                $img.style.top = y + 'px'
                $img.classList.remove('hide')
            }
            if (element.active) {
                element.time += 1000
            }
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

    getRandom(min, max) {
        return Math.floor(Math.random() * (max - min)) + min
    }
}