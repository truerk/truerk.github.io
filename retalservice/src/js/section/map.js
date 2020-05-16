import ymaps from "ymaps";

export default function initMap() {
    const ymapsContainer = document.querySelector('#ymaps')

    const buildMap = () => {
        //Инициализация яндекс.карт
        ymaps
            .load("https://api-maps.yandex.ru/2.1/?apikey=74f946ea-5b98-49f2-9582-78854bb86bdf&lang=ru_RU&bust=v10")
            .then(maps => {
                //Настройки интерфейса
                let myGeoObjects = [],
                    myClusterer,
                    points = [];

                //Создаем карту
                const map = new maps.Map("ymaps", {
                    center: [53.539484, 49.265901],
                    zoom: 12,
                    margin: 10,
                    controls: ['fullscreenControl', 'geolocationControl', 'zoomControl']
                }, {suppressMapOpenBlock: true, searchControlProvider: 'yandex#search'});

                if (window.innerWidth < 768) {
                    const zoomValue = map.controls.get('zoomControl');
                    zoomValue.options.set('size', 'small')
                }

                //Создаем кластер
                myClusterer = new maps.Clusterer(
                    {
                        preset: 'islands#redClusterIcons',
                        disableClickZoom: false,
                        openBalloonOnClick: false,
                    }
                );

                //Настройки поведения карты
                window.addEventListener("resize", () => {
                    map.container.fitToViewport();
                    map.behaviors.disable("multiTouch");
                });
                map.behaviors.disable('scrollZoom');

                /**
                 * Добавляем метки на карту
                 */
                function setGeoObject(points) {
                    let myGeoObjects = [];

                    points.forEach((point, i)=> {
                        myGeoObjects[i] = new maps.GeoObject({
                            geometry: {
                                type: "Point",
                                coordinates: point.coords,
                            },
                            properties: {
                                balloonContentHeader: point.cityName,
                                balloonContentBody: `<p>${point.officeStreet}</p>`,
                            },
                            }, {
                                preset: "islands#yellowDotIcon",
                                iconLayout: "default#image",
                                iconImageHref: "/src/assets/img/icon_place.png",
                                iconImageSize: [33, 53],
                                iconImageOffset: [-17, -55],
                                draggable: false,
                                draggable: false,
                                hideIconOnBalloonOpen: false,
                                balloonOpenTimeout: 300,
                                balloonPane: 'outerBalloon',
                                //balloonPanelMaxMapArea: 0,
                                zIndex: -1
                        });

                        //Обрабатываем нажатие на метку, скролл к метке
                        myGeoObjects[i].events.add('click', function (e) {
                            const GeoObjectCoords = myGeoObjects[i].geometry.getCoordinates();
                            const map_left = myGeoObjects[i].options.get('projection').toGlobalPixels(map.getBounds()[1], map.getZoom());
                            const GeoObject_left = myGeoObjects[i].options.get('projection').toGlobalPixels(myGeoObjects[i].geometry.getBounds()[1], map.getZoom());
                            const XYgeoObjects = myGeoObjects[i].options.get('projection').toGlobalPixels(myGeoObjects[i].geometry.getBounds()[1], map.getZoom());
                            let pixelCenter;

                            if (!window.matchMedia("(max-width: 959px)").matches) {
                                pixelCenter = [
                                    XYgeoObjects[0] + 300,
                                    XYgeoObjects[1]
                                ];
                            } else {
                                pixelCenter = [
                                    XYgeoObjects[0] ,
                                    XYgeoObjects[1]
                                ];
                            }

                            const geoCenter = map.options.get('projection').fromGlobalPixels(pixelCenter, map.getZoom());

                            map.setCenter(geoCenter, map.getZoom(), {
                                duration: 300
                            });
                        });
                    });

                    myClusterer.add(myGeoObjects);
                    map.geoObjects.add(myClusterer);
                }

                const coords = {coords: [53.539484, 49.265901], cityName: 'Тольятти', officeStreet: 'ул. Дзержинского, д. 98, оф. 90 по будням с 8:00 до 17:00'};
                points.push(coords);
                setGeoObject(points);
            })
            .catch(error => console.log("Failed to load Yandex Maps", error));
    };

    buildMap()
    window.addEventListener("resize", () => {
        buildMap()
    });
}

