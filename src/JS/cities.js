export class Cities {
    constructor(cities) {
        this.init(cities)
    }

    init(cities) {
        const $map = document.querySelector('.map')
        cities.map(elem => {
            $map.insertAdjacentHTML('afterbegin',
                `<g class="hide" id="${elem.id}Text">
                        <rect id="rect${elem.id}" fill="white" > </rect>
                        <text x="${elem.x - 20}" y="${elem.y - 20}" font-style="italic">${elem.name}</text>
                         </g>
                        <circle id="${elem.id}Point" class="point" r="5" cx="${elem.x}" cy="${elem.y}"/>`)
            const $rectBBox = document.querySelector(`#rect${elem.id}`);
            const $groupElement = document.querySelector(`#${elem.id}Text`);
            const $bboxGroup = $groupElement.getBBox();

            $rectBBox.setAttribute('x', $bboxGroup.x - 5);
            $rectBBox.setAttribute('y', $bboxGroup.y - 3);
            $rectBBox.setAttribute('width', $bboxGroup.width + 10);
            $rectBBox.setAttribute('height', $bboxGroup.height + 7);

            const $point = document.querySelector(`#${elem.id}Point`)
            $point.addEventListener("mouseenter", function (event) {
                const $text = document.querySelector(`#${elem.id}Text`)
                $text.classList.remove('hide')
                event.target.style.fill = "orange"
                setTimeout(function () {
                    $text.classList.add('hide')
                    event.target.style.fill = ""
                }, 1500);
            }, false)
        })
    }
}