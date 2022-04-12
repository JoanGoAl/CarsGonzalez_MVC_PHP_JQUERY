function load_title(text, div) {

    let brandcolor = document.createElement('div')
    let containercolor = document.createElement('div')
    let rowcolor = document.createElement('div')
    let titlePos = document.createElement('div')
    let titlePage = document.createElement('div')
    let title = document.createElement('h2')
    let brand = document.createElement('div')

    brandcolor.className = 'brand_color'
    containercolor.className = 'container'
    brand.className = 'brand'
    rowcolor.className = 'row'
    titlePos.className = 'col-md-12'
    titlePage.className = 'titlepage'
    title.appendChild(document.createTextNode(text))

    document.getElementById(div).appendChild(brandcolor)
    brandcolor.appendChild(containercolor)
    containercolor.appendChild(rowcolor)
    rowcolor.appendChild(titlePos)
    titlePos.appendChild(titlePage)
    titlePage.appendChild(title)
    document.getElementById(div).appendChild(brand)

    load_orderBy()

}

function load_swiper() {
    const swiper2 = new Swiper('.swiper', {
        // Optional parameters
        direction: 'horizontal',
        slidesPerView: 1,
        speed: 400,
        loop: true,
        autoplay: {
            delay: 3000
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        // And if we need scrollbar
    });
}

function load_details(id) {
    ajaxPromise("GET", "modules/shop/ctrl/controller_shop.php?op=details_car&id=" + id, "json")
        .then(function(json) {

            let numvisited = parseInt(json[0].visited)
            let newnum = numvisited + 1

            // console.log(newnum);

            ajaxPromise("GET", "modules/shop/ctrl/controller_shop.php?op=car_visited&id=" + id + "&num=" + newnum, "json")
                .then(function(json) {
                    // console.log(json);

                }).catch(function() {
                    console.log('error update visited')
                })

            load_location(json, 1)


            let about = document.createElement('div')
            let containerCat = document.createElement('div')
            let rowCat = document.createElement('div')

            let container = document.createElement('div')
            let row = document.createElement('div')

            let imgPos = document.createElement('div')
            let imgContainer = document.createElement('div')
            let imgFigure = document.createElement('figure')

            // Carrusel fotos
            let containerC = document.createElement('div')
            let rowC = document.createElement('div')
            let swiper = document.createElement('div')
            let swiperWrapper = document.createElement('div')
            let pagination = document.createElement('div')
            let buttPrev = document.createElement('div')
            let buttNext = document.createElement('div')

            containerC.className = 'container'
            rowC.className = 'row'
            swiper.className = 'swiper'
            swiperWrapper.className = 'swiper-wrapper'
            pagination.className = 'swiper-pagination'
            buttPrev.className = 'swiper-button-prev'
            buttNext.className = 'swiper-button-next'

            imgFigure.appendChild(containerC)
            containerC.appendChild(rowC)
            rowC.appendChild(swiper)
            swiper.appendChild(swiperWrapper)
            swiper.appendChild(pagination)
            swiper.appendChild(buttPrev)
            swiper.appendChild(buttNext)

            $.each(json[1], function(index, value) {

                let swiperSlide = document.createElement('div')
                let mCard = document.createElement('div')
                let divImage = document.createElement('div')
                    // let nameBrand = document.createElement('div')

                swiperSlide.className = "swiper-slide m-slide__item"
                mCard.className = "m-card"
                divImage.className = "m-card__header"
                divImage.style.backgroundImage = "url('" + value.url_photo + "')"
                    // nameBrand.className = "m-card__body"
                    // nameBrand.textContent = " "

                swiperWrapper.appendChild(swiperSlide)
                swiperSlide.appendChild(mCard)
                mCard.appendChild(divImage)
                    // mCard.appendChild(nameBrand)
            });


            let catPos = document.createElement('div')
            let catContainer = document.createElement('div')
            let catTitle = document.createElement('span')
            let catDesc = document.createElement('p')
            let catPrice = document.createElement('h2')
            let timevisited = document.createElement('h2')

            let buttPos = document.createElement('div')
            let butt = document.createElement('a')

            about.className = 'about'
            containerCat.className = 'container'
            rowCat.className = 'row'

            document.getElementById('list_shop').appendChild(about)
            about.appendChild(containerCat)
            containerCat.appendChild(rowCat)

            container.className = 'container'
            row.className = 'row'

            imgPos.className = 'col-xl-5 col-lg-5 col-md-5 co-sm-l2'
            imgContainer.className = 'about_img'

            catPos.className = 'col-xl-7 col-lg-7 col-md-7 co-sm-l2'

            catTitle.appendChild(document.createTextNode(json[0].name_brand + ' ' + json[0].name_model))

            // console.log(json);
            catDesc.appendChild(document.createTextNode('CV: ' + json[0].cv + ' Kilometros: ' + json[0].kms + ' Numero de puertas: ' + json[0].num_door))
            catPrice.appendChild(document.createTextNode('Precio: ' + json[0].price + '€'))
            timevisited.appendChild(document.createTextNode('Veces visitado: ' + numvisited))

            catContainer.className = 'about_box'

            buttPos.className = 'col-md-12'
            butt.className = 'read-more'
            butt.appendChild(document.createTextNode('Back'))

            rowCat.appendChild(imgPos)
            rowCat.appendChild(catPos)

            imgPos.appendChild(imgContainer)
            imgContainer.appendChild(imgFigure)

            catPos.appendChild(catContainer)
            catContainer.appendChild(catTitle)
            catContainer.appendChild(catDesc)
            catContainer.appendChild(catPrice)
            catContainer.appendChild(timevisited)

            about.appendChild(buttPos)
            buttPos.appendChild(butt)

            $(butt).on('click', function() {
                let itemsOflist = document.getElementById('list_shop')
                while (itemsOflist.firstChild) {
                    itemsOflist.removeChild(itemsOflist.lastChild);
                }
                load_page()
            })

            //Coches relacionados
            // console.log(json[0].id_category + " " + json[0].id_type + " " + json[0].id_bodywork);

            ajaxPromise("GET", "modules/shop/ctrl/controller_shop.php?op=related_cars&cat=" + json[0].id_category + "&type=" + json[0].id_type + "&idcar=" + json[0].id_car, "json")
                .then(function(jsonCars) {

                    // let carArray = new Array()

                    // carArray = jsonCars

                    // console.log(carArray);

                    let brandBg = document.createElement('div')
                    let container = document.createElement('div')
                    let row = document.createElement('div')

                    brandBg.className = 'brand-bg'
                    brandBg.id = 'brand-bg'
                    container.className = 'container'
                    container.id = 'containerCar'
                    row.className = 'row'

                    document.getElementById('list_shop').appendChild(brandBg)
                    brandBg.appendChild(container)
                    container.appendChild(row)

                    let buttonmore = document.createElement('div')
                    buttonmore.className = 'col-md-12 read-more'
                    buttonmore.id = 'read-more'
                    buttonmore.appendChild(document.createTextNode('See More'))

                    let numofrelataed = -3

                    // Al pulsar que borre lo anterior y cree els nous
                    $.each(jsonCars.slice([numofrelataed]), function(index, value) {

                        let posBox = document.createElement('div')
                        let brandBox = document.createElement('div')
                        let img = document.createElement('img')
                        let brandModel = document.createElement('h3')
                        let price = document.createElement('span')

                        posBox.className = 'col-xl-4 col-lg-4 col-md-4 col-sm-6 margin'
                        brandBox.className = 'brand_box'
                        img.src = value.photo_car
                        brandModel.appendChild(document.createTextNode(value.name_brand + ' ' + value.name_model))
                        price.appendChild(document.createTextNode(value.price + ' €'))

                        row.appendChild(posBox)
                        posBox.appendChild(brandBox)
                        brandBox.appendChild(img)
                        brandBox.appendChild(brandModel)
                        brandBox.appendChild(price)

                        $(brandBox).on('click', function() {
                            let itemsOflist = document.getElementById('list_shop')
                            while (itemsOflist.firstChild) {
                                itemsOflist.removeChild(itemsOflist.lastChild);
                            }
                            load_details(value.id_car)
                        })


                    });
                    $(buttonmore).on('click', function() {
                        console.log(numofrelataed);

                        while (row.firstChild) {
                            row.removeChild(row.lastChild)
                        }
                        numofrelataed = numofrelataed - 3
                        $.each(jsonCars.slice([numofrelataed]), function(index, value) {

                            let posBox = document.createElement('div')
                            let brandBox = document.createElement('div')
                            let img = document.createElement('img')
                            let brandModel = document.createElement('h3')
                            let price = document.createElement('span')

                            posBox.className = 'col-xl-4 col-lg-4 col-md-4 col-sm-6 margin'
                            brandBox.className = 'brand_box'
                            img.src = value.photo_car
                            brandModel.appendChild(document.createTextNode(value.name_brand + ' ' + value.name_model))
                            price.appendChild(document.createTextNode(value.price + ' €'))

                            row.appendChild(posBox)
                            posBox.appendChild(brandBox)
                            brandBox.appendChild(img)
                            brandBox.appendChild(brandModel)
                            brandBox.appendChild(price)

                            $(brandBox).on('click', function() {
                                let itemsOflist = document.getElementById('list_shop')
                                while (itemsOflist.firstChild) {
                                    itemsOflist.removeChild(itemsOflist.lastChild);
                                }
                                load_details(value.id_car)
                            })


                        });

                    });


                    container.appendChild(buttonmore)

                }).catch(function() {
                    console.log('error load Details')
                })

            load_swiper()

        }).catch(function() {
            console.log('error load Details')
        })

}

function load_cars(jsonCars) {

    let brandBg = document.createElement('div')
    let container = document.createElement('div')
    let row = document.createElement('div')

    brandBg.className = 'brand-bg'
    brandBg.id = 'brand-bg'
    container.className = 'container'
    container.id = 'containerCar'
    row.className = 'row'

    document.getElementById('list_shop').appendChild(brandBg)
    brandBg.appendChild(container)
    container.appendChild(row)

    $.each(jsonCars, function(index, value) {

        let posBox = document.createElement('div')

        let containerDet = document.createElement('div')
        let brandBox = document.createElement('div')
        let img = document.createElement('img')
        let brandModel = document.createElement('h3')
        let price = document.createElement('span')
        let positionlike = document.createElement('div')
        let heart = document.createElement('i')

        posBox.className = 'col-xl-4 col-lg-4 col-md-4 col-sm-6 margin'
        brandBox.className = 'brand_box'
        brandBox.id = value.id_car
        containerDet.className = 'containerDet'
        containerDet.id = value.id_car
        img.src = value.photo_car
        brandModel.appendChild(document.createTextNode(value.name_brand + ' ' + value.name_model))
        price.appendChild(document.createTextNode(value.price + ' €'))
        positionlike.id = 'like-box'
        positionlike.setAttribute('idlike', 'like-box-' + value.id_car)
        positionlike.className = 'no-like'
        heart.className = 'fa fa-heart fa-lg'

        row.appendChild(posBox)
        posBox.appendChild(brandBox)
        brandBox.appendChild(containerDet)
        brandBox.appendChild(positionlike)
        containerDet.appendChild(img)
        containerDet.appendChild(brandModel)
        containerDet.appendChild(price)
        positionlike.appendChild(heart)

        if (localStorage.getItem('token')) {

            $(positionlike).on('click', function() {

                if (positionlike.className == 'no-like') {
                    positionlike.className = 'like'
                } else {
                    $(this).removeAttr('class');
                    positionlike.className = 'no-like'
                }

                ajaxPromise("POST", 'modules/shop/ctrl/controller_shop.php?op=likes', "json", value)
                    .then(function(res) {

                        console.log(res);

                    }).catch(function() {
                        console.log('Error likes')
                    })

            });
        } else {
            $(positionlike).on('click', function() {

                alert('Tienes que estar registrado para dar like');

            });
        }

        // Fer que el on click del like siga priopritari a este
        $(containerDet).on('click', function() {

            let itemsOflist = document.getElementById('list_shop')
            while (itemsOflist.firstChild) {
                itemsOflist.removeChild(itemsOflist.lastChild);
            }
            load_details(value.id_car)
        })


    });

    ajaxPromise("POST", 'modules/shop/ctrl/controller_shop.php?op=user_likes', "json")
        .then(function(res) {
            console.log(res);

            if (res != null) {
                $.each(res, function(index, valuelikes) {

                    $('#' + valuelikes.id_car).find('#like-box').attr('class', 'like');

                });
            }
        }).catch(function() {
            console.log('Error likes user')
        })

    let containerpagbutt = document.createElement('div')
    let buttonprev = document.createElement('div')
    let buttonpost = document.createElement('div')
    let contnop = document.createElement('div')

    buttonprev.appendChild(document.createTextNode('<'))
    buttonpost.appendChild(document.createTextNode('>'))

    containerpagbutt.className = 'containerpagbutt'
    containerpagbutt.id = 'containerpagbutt'

    contnop.className = 'containernumpage'
    contnop.id = 'containernumpage'

    buttonprev.className = 'buttpagination'
    buttonprev.id = 'buttonprev'

    buttonpost.className = 'buttpagination'
    buttonpost.id = 'buttonpost'

    document.getElementById('list_shop').appendChild(containerpagbutt)
    containerpagbutt.appendChild(buttonprev)
    containerpagbutt.appendChild(contnop)
    containerpagbutt.appendChild(buttonpost)

    // let buttonRemove = document.createElement('div')

    // buttonRemove.appendChild(document.createTextNode('Remove filters'))

    // buttonRemove.className = 'col-md-12 read-more'
    // buttonRemove.id = 'remove-filters'

    // containerFilters.appendChild(buttonRemove)
}

function load_filters() {

    let filters = document.createElement('div')
    let containerFilters = document.createElement('div')

    filters.className = 'filters'
    containerFilters.className = 'container-filters'

    document.getElementById('list_shop').appendChild(filters)
    filters.appendChild(containerFilters)

    // Filtrado por marcas

    ajaxPromise("GET", "modules/shop/ctrl/controller_shop.php?op=brands", "json")
        .then(function(brand) {
            // console.log(brand)

            let titleFilters1 = document.createElement('h2')
            let containerSelect1 = document.createElement('div')
            let select1 = document.createElement('select')
            let option11 = document.createElement('option')

            titleFilters1.className = 'title-filters'
            titleFilters1.appendChild(document.createTextNode('Por marcas'))
            containerSelect1.className = 'col-md-12'
            select1.className = 'form-control'
            select1.style = 'height: 54px;'
            select1.name = 'marca'
            select1.id = 'marca'

            option11.selected = 'selected'
            option11.value = 'Allbrand'
            option11.appendChild(document.createTextNode('Seleccione todas las marcas'))

            containerFilters.appendChild(titleFilters1)
            containerFilters.appendChild(containerSelect1)
            containerSelect1.appendChild(select1)
            select1.appendChild(option11)

            $.each(brand[0], function(indexInArray, value) {

                let option12 = document.createElement('option')

                option12.value = value.id_brand
                option12.id = 'filterOption'
                option12.appendChild(document.createTextNode(value.name_brand))

                select1.appendChild(option12)


            });
            highlights()
            let titleFilters2 = document.createElement('h2')
            let containerSelect2 = document.createElement('div')
            let select2 = document.createElement('select')
            let option21 = document.createElement('option')


            titleFilters2.className = 'title-filters'
            titleFilters2.appendChild(document.createTextNode('Por modelos'))
            containerSelect2.className = 'col-md-12'
            select2.className = 'form-control'
            select2.style = 'height: 54px;'
            select2.name = 'modelo'
            select2.id = 'modelo'
            option21.selected = 'selected'
            option21.value = 'Allmodels'

            option21.appendChild(document.createTextNode('Seleccione todos los modelos'))
            containerFilters.appendChild(titleFilters2)
            containerFilters.appendChild(containerSelect2)
            containerSelect2.appendChild(select2)
            select2.appendChild(option21)

            $.each(brand[1], function(indexInArray, valueOfElement) {
                // console.log(valueOfElement)
                if (select1.value == valueOfElement.id_brand) {

                    let option22 = document.createElement('option')
                    option22.value = valueOfElement.id_model
                    option22.appendChild(document.createTextNode(valueOfElement.name_model))
                    select2.appendChild(option22)

                } else {
                    // console.log('Fuera');
                }


            });
            highlights()
            $(select1).on('change', function() {

                while (select2.firstChild) {
                    select2.removeChild(select2.lastChild)
                }
                localStorage.setItem('filters', select1.value)
                select2.appendChild(option21)
                option21.selected = 'selected'

                // console.log(select1.value);

                saveLocalStorage()
                localStorage.setItem('pagination', 0)
                position = JSON.parse(localStorage.getItem('pagination'))
                ajaxForSearch(position)
                document.getElementById('brand-bg').remove()
                document.getElementById('location').remove()
                document.getElementById('containerpagbutt').remove()

                // console.log(localStorage.getItem('filters'))

                $.each(brand[1], function(indexInArray, valueOfElement) {
                    // console.log(valueOfElement)
                    if (select1.value == valueOfElement.id_brand) {

                        let option22 = document.createElement('option')
                        option22.value = valueOfElement.id_model
                        option22.appendChild(document.createTextNode(valueOfElement.name_model))
                        select2.appendChild(option22)

                    } else {
                        // console.log('Fuera');
                    }


                });

            })

            $(select2).on('change', function() {
                saveLocalStorage()
                localStorage.setItem('pagination', 0)
                position = JSON.parse(localStorage.getItem('pagination'))
                ajaxForSearch(position)
                document.getElementById('brand-bg').remove()
                document.getElementById('location').remove()
                document.getElementById('containerpagbutt').remove()
            });

            // Filtrar por colores
            let titleFilters3 = document.createElement('h2')
            let containerSelect3 = document.createElement('div')
            let select3 = document.createElement('select')
            let option31 = document.createElement('option')

            titleFilters3.className = 'title-filters'
            titleFilters3.appendChild(document.createTextNode('Por colores'))
            containerSelect3.className = 'col-md-12'
            select3.className = 'form-control'
            select3.style = 'height: 54px;'
            select3.name = 'color'
            select3.id = 'color'

            option31.selected = 'selected'
            option31.value = 'Allcolors'
            option31.appendChild(document.createTextNode('Seleccione todos los colores'))

            containerFilters.appendChild(titleFilters3)
            containerFilters.appendChild(containerSelect3)
            containerSelect3.appendChild(select3)
            select3.appendChild(option31)

            $.each(brand[2], function(indexInArray, value) {

                let option32 = document.createElement('option')

                option32.value = value.color
                option32.appendChild(document.createTextNode(value.color))

                select3.appendChild(option32)

            });
            highlights()

            $(select3).on('change', function() {
                saveLocalStorage()
                localStorage.setItem('pagination', 0)
                position = JSON.parse(localStorage.getItem('pagination'))
                ajaxForSearch(position)
                document.getElementById('brand-bg').remove()
                document.getElementById('location').remove()
                document.getElementById('containerpagbutt').remove()
            });

            // let titleFilters4 = document.createElement('h2')

            // titleFilters4.className = 'title-filters'
            // titleFilters4.appendChild(document.createTextNode('Numero de puertas'))

            // containerFilters.appendChild(titleFilters4)

            // let checkboxDoors = document.createElement('div')

            // let input2door = document.createElement('input')
            // let label2door = document.createElement('label')

            // let input3door = document.createElement('input')
            // let label3door = document.createElement('label')

            // let input4door = document.createElement('input')
            // let label4door = document.createElement('label')

            // let input5door = document.createElement('input')
            // let label5door = document.createElement('label')

            // checkboxDoors.className = 'checkboxDoors'
            // input2door.type = 'checkbox'
            // input2door.name = 'doors'
            // input2door.id = '2door'
            // label2door.setAttribute('for', '2door')
            // label2door.appendChild(document.createTextNode('2'))

            // input3door.type = 'checkbox'
            // input3door.name = 'doors'
            // input3door.id = '3door'
            // label3door.setAttribute('for', '3door')
            // label3door.appendChild(document.createTextNode('3'))

            // input4door.type = 'checkbox'
            // input4door.name = 'doors'
            // input4door.id = '4door'
            // label4door.setAttribute('for', '4door')
            // label4door.appendChild(document.createTextNode('4'))

            // input5door.type = 'checkbox'
            // input5door.name = 'doors'
            // input5door.id = '5door'
            // label5door.setAttribute('for', '5door')
            // label5door.appendChild(document.createTextNode('5'))

            // containerFilters.appendChild(checkboxDoors)
            // checkboxDoors.appendChild(input2door)
            // checkboxDoors.appendChild(label2door)

            // checkboxDoors.appendChild(input3door)
            // checkboxDoors.appendChild(label3door)

            // checkboxDoors.appendChild(input4door)
            // checkboxDoors.appendChild(label4door)

            // checkboxDoors.appendChild(input5door)
            // checkboxDoors.appendChild(label5door)

            let buttonRemove = document.createElement('div')

            buttonRemove.appendChild(document.createTextNode('Remove filters'))

            buttonRemove.className = 'col-md-12 read-more'
            buttonRemove.id = 'remove-filters'

            containerFilters.appendChild(buttonRemove)

            remove_filters()

        }).catch(function() {
            console.log('error load filters')
        })
    position = JSON.parse(localStorage.getItem('pagination'))
    ajaxForSearch(position)

}

function saveLocalStorage() {

    let filtros = {
        id_brands: '',
        id_models: '',
        color: '',
        category: 'Allcategories',
        city: 'Allcities',
        bodywork: 'Allbody'
    }

    if ($('#marca').val() != 'Allbrand') {
        filtros.id_brands = $('#marca').val()
    } else {
        filtros.id_brands = 'Allbrand'
    }

    if ($('#modelo').val() != 'Allmodels') {
        filtros.id_models = $('#modelo').val()
    } else {
        filtros.id_models = 'Allmodels'
    }

    if ($('#color').val() != 'Allcolors') {
        filtros.color = $('#color').val()
    } else {
        filtros.color = 'Allcolors'
    }

    localStorage.setItem('filters', JSON.stringify(filtros))

}

function remove_filters() {

    $('#remove-filters').on('click', function() {
        let filtros = {
            id_brands: 'Allbrand',
            id_models: 'Allmodels',
            color: 'Allcolors',
            category: 'Allcategories',
            city: 'Allcities',
            bodywork: 'Allbody'
        }
        let order = 'def'

        localStorage.setItem('filters', JSON.stringify(filtros))
        localStorage.setItem('orderBy', JSON.stringify(order))
        localStorage.setItem('pagination', 0)

        let shop = document.getElementById('list_shop')
        while (shop.firstChild) {
            shop.removeChild(shop.lastChild)
        }
        load_page()

    });
}

function ajaxForSearch(pagination) {

    var data = JSON.parse(localStorage.getItem('filters'))

    var pos = JSON.parse(localStorage.getItem('orderBy'))

    if (pagination == null) {
        pagination = 0
    }

    ajaxPromise("POST", "modules/shop/ctrl/controller_shop.php?op=filters&pos=" + pos + "&pag=" + pagination, "json", data)
        .then((filterCars) => {
            // console.log(filterCars);
            load_items(filterCars)
        }).catch(function() {
            console.log('error ajaxforsearch')
        })


}

function load_items(filterCars) {

    if (filterCars) {
        load_location(filterCars[0], 0)
        load_cars(filterCars[0])
        button_pagination(filterCars[1])

    } else {
        ajaxPromise("GET", 'modules/shop/ctrl/controller_shop.php?op=list_cars', "json")
            .then(function(jsonCars) {
                load_location(jsonCars, 0)
                load_cars(jsonCars)

            }).catch(function() {
                console.log('Error en load items')
            })
    }

}

function load_location(jsonlocation, pos) {


    let containerLocation = document.createElement('div')
    let containerMap = document.createElement('div')

    switch (pos) {
        case 0:
            containerLocation.className = 'location'
            containerLocation.id = 'location'
            break;

        case 1:
            containerLocation.className = 'location-details'
            containerLocation.id = 'location-details'
            break;
        default:
            break;
    }


    containerMap.id = 'map'

    document.getElementById('list_shop').appendChild(containerLocation)
    containerLocation.appendChild(containerMap)

    mapboxgl.accessToken = 'pk.eyJ1Ijoiam9hbmdnNCIsImEiOiJjbDAxNDY3M3EwZ3FiM2NtZWd2cDFscWR4In0.i-vcBEVshSWAABkJjsXYxw';
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: [-0.4166700, 39], // [lng, lat]
        zoom: 7 // starting zoom
    });

    switch (pos) {
        case 0:
            $.each(jsonlocation, function(indexInArray, value) {

                const popup = new mapboxgl.Popup({ closeOnClick: true })
                    .setHTML(
                        '<p>' + value.name_brand + ' ' + value.name_model + '</p><img class="redirectPopup" src="' + value.photo_car + '" alt="">'
                        // popup.appendChild(containerAll)
                    )

                // $(popup).on('click', function() {
                //     console.log('hola');
                // });
                const marker = new mapboxgl.Marker({
                        color: '#FF0000',
                        draggable: false
                    })
                    .setLngLat([value.lng, value.lat])
                    .setPopup(popup)
                    .addTo(map);

                $(document).on('click', '.mapboxgl-popup-content', function() {
                    // load_details(value.id_car)
                });
            });

            break;

        case 1:

            const popup = new mapboxgl.Popup({ closeOnClick: false })
                .setHTML(
                    '<p>' + jsonlocation[0].name_brand + ' ' + jsonlocation[0].name_model + '</p><img class="redirectPopup" src="' + jsonlocation[0].photo_car + '" alt="">'
                    // popup.appendChild(containerAll)
                )

            const marker = new mapboxgl.Marker({
                    color: '#FF0000',
                    draggable: false
                })
                .setLngLat([jsonlocation[0].lng, jsonlocation[0].lat])
                .setPopup(popup)
                .addTo(map);
            break;
        default:
            break;
    }




}

function highlights() {

    let values = JSON.parse(localStorage.getItem('filters'))

    $('#marca option[value=' + values.id_brands + ']').attr('selected', true)
    $('#modelo option[value=' + values.id_models + ']').attr('selected', true)
    $('#color option[value=' + values.color + ']').attr('selected', true)

}

function load_orderBy() {
    let containerSelect = document.createElement('div')
    let select = document.createElement('select')
    let option = document.createElement('option')

    containerSelect.className = 'col-md-3'
    select.className = 'form-control orderBy'
    select.style = 'height: 54px; margin-left: 1350px;'
    select.name = 'orderBy'
    select.id = 'orderBy'

    option.selected = 'selected'
    option.value = 'def'
    option.appendChild(document.createTextNode('Order By'))

    let option1 = document.createElement('option')
    let option2 = document.createElement('option')

    option1.value = 'price'
    option2.value = 'km'
    option1.appendChild(document.createTextNode('Price'))
    option2.appendChild(document.createTextNode('Km'))

    document.getElementById('list_shop').appendChild(containerSelect)
    containerSelect.appendChild(select)
    select.appendChild(option)
    select.appendChild(option1)
    select.appendChild(option2)

    let order = 'def'
        // $(select).on('change', function() {
        //     order = select.value
        //     localStorage.setItem('orderBy', JSON.stringify(order))
        //     ajaxForSearch(0)
        //     document.getElementById('brand-bg').remove()
        //     document.getElementById('location').remove()

    // });


    // localStorage.setItem('order', order)



}

function button_pagination(jsonnumofcars) {

    // Fer per a poder tirar quants cotxes cabran en cada pagina


    // Paginacion para cambiar la cantidad de coches que queremos por pagina (recordar cambair el limit en el DAO)
    let paginacion = 6

    // Esto es el numero total de paginas divido el numero total de coches entre la paginacion (trucar para arriba para evitar errores)
    numofpages = Math.ceil(jsonnumofcars.numofcars / paginacion)

    let contText = document.createElement('p')

    contText.id = 'conttextpagination'
    contText.className = 'conttextpagination'

    document.getElementById('containernumpage').appendChild(contText)

    //En position guardo en que pagina estamos, depende de la paginacion ya que si la paginacion es de 4 la pagina 1 sera 0, la 2 sera 4, la 3 sera 8...
    position = JSON.parse(localStorage.getItem('pagination'))

    //calcpag calcula la posicion divide la posicion guardada en base de datos entre la paginacion (al sumarle 1 te saldra la pagina actual)
    let calcpag = position / paginacion

    if (numofpages == 0) {
        contText.appendChild(document.createTextNode(0 + ' / ' + numofpages))
    } else {
        contText.appendChild(document.createTextNode((calcpag + 1) + ' / ' + numofpages))
    }

    $('#buttonpost').on('click', function() {

        //Si 
        if ((calcpag + 1) != numofpages) {
            position += paginacion

            localStorage.setItem('pagination', position)

            ajaxForSearch(position)
            document.getElementById('brand-bg').remove()
            document.getElementById('location').remove()
            document.getElementById('containerpagbutt').remove()
        }

    });

    $('#buttonprev').on('click', function() {

        if (position != 0) {
            position -= paginacion

            localStorage.setItem('pagination', position)

            ajaxForSearch(position)
            document.getElementById('brand-bg').remove()
            document.getElementById('location').remove()
            document.getElementById('containerpagbutt').remove()
        }
    });
}

function load_page() {

    load_filters()
    load_title('Cars', 'list_shop');

}

$(document).ready(function() {

    load_page()

})