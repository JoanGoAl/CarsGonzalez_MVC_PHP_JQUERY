function load_title(text, div) {

    let brandColor = document.createElement('div')
    let containerColor = document.createElement('div')
    let rowColor = document.createElement('div')
    let titlePos = document.createElement('div')
    let titlePage = document.createElement('div')
    let title = document.createElement('h2')
    let brand = document.createElement('div')

    brandColor.className = 'brand_color'
    containerColor.className = 'container'
    brand.className = 'brand'
    rowColor.className = 'row'
    titlePos.className = 'col-md-12'
    titlePage.className = 'titlepage'
    title.appendChild(document.createTextNode(text))

    document.getElementById(div).appendChild(brandColor)
    brandColor.appendChild(containerColor)
    containerColor.appendChild(rowColor)
    rowColor.appendChild(titlePos)
    titlePos.appendChild(titlePage)
    titlePage.appendChild(title)
    document.getElementById(div).appendChild(brand)
}

function load_brands() {
    ajaxPromise("GET", "modules/home/ctrl/controller_home.php?op=list_brands", "json")
        .then(function(json) {

            load_title('Brands', 'load_brands')

            let container = document.createElement('div')
            let row = document.createElement('div')
            let swiper = document.createElement('div')
            let swiperWrapper = document.createElement('div')
            let buttPrev = document.createElement('div')
            let buttNext = document.createElement('div')

            container.className = 'container'
            row.className = 'row'
            swiper.className = 'swiper'
            swiperWrapper.className = 'swiper-wrapper'
            buttPrev.className = 'swiper-button-prev'
            buttNext.className = 'swiper-button-next'

            document.getElementById('load_brands').appendChild(container)
            container.appendChild(row)
            row.appendChild(swiper)
            swiper.appendChild(swiperWrapper)
            swiper.appendChild(buttPrev)
            swiper.appendChild(buttNext)

            $.each(json, function(index, value) {

                let swiperSlide = document.createElement('div')
                let mCard = document.createElement('div')
                let divImage = document.createElement('div')
                let nameBrand = document.createElement('div')

                swiperSlide.className = "swiper-slide m-slide__item"
                mCard.className = "m-card"
                divImage.className = "m-card__header clicktoredirect brandredirect"
                divImage.id = value.id_brand
                divImage.style.backgroundImage = "url('" + value.photo_brand + "')"
                nameBrand.className = "m-card__body"
                nameBrand.textContent = value.name_brand

                swiperWrapper.appendChild(swiperSlide)
                swiperSlide.appendChild(mCard)
                mCard.appendChild(divImage)
                mCard.appendChild(nameBrand)
            });

            const swiper2 = new Swiper('.swiper', {
                // Optional parameters
                direction: 'horizontal',
                slidesPerView: 3,
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
        }).catch(function() {
            console.log(error)
        })

}

function load_categories() {

    ajaxPromise("GET", "modules/home/ctrl/controller_home.php?op=list_categories", "json")
        .then(function(json) {

            load_title('Categories', 'load_categories')

            let about = document.createElement('div')
            let containerCat = document.createElement('div')
            let rowCat = document.createElement('div')

            about.className = 'about'
            containerCat.className = 'container'
            rowCat.className = 'row'

            document.getElementById('load_categories').appendChild(about)
            about.appendChild(containerCat)
            containerCat.appendChild(rowCat)

            let cont = 1
            $.each(json, function(index, value) {

                let container = document.createElement('div')
                let row = document.createElement('div')

                let imgPos = document.createElement('div')
                let imgContainer = document.createElement('div')
                let imgFigure = document.createElement('figure')
                let img = document.createElement('img')

                let catPos = document.createElement('div')
                let catContainer = document.createElement('div')
                let catTitle = document.createElement('span')
                let catDesc = document.createElement('p')

                container.className = 'container'
                row.className = 'row'

                imgPos.className = 'col-xl-5 col-lg-5 col-md-5 co-sm-l2'
                imgContainer.className = 'about_img'
                img.src = value.photo_category
                img.id = value.id_category
                img.className = 'clicktoredirect categoryredirect'

                catPos.className = 'col-xl-7 col-lg-7 col-md-7 co-sm-l2'

                catTitle.innerText = value.name_category

                catDesc.appendChild(document.createTextNode('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc efficitur odio sed risus eleifend, non pharetra lectus tempus. Morbi facilisis massa at consectetur vestibulum. Pellentesque finibus eleifend libero, eget laoreet.'))

                if (cont % 2 == 1) {
                    catContainer.className = 'about_box'

                    rowCat.appendChild(imgPos)
                    rowCat.appendChild(catPos)
                } else if (cont % 2 == 0) {
                    catContainer.className = 'about_box_'

                    rowCat.appendChild(catPos)
                    rowCat.appendChild(imgPos)
                }

                imgPos.appendChild(imgContainer)
                imgContainer.appendChild(imgFigure)
                imgFigure.appendChild(img)

                catPos.appendChild(catContainer)
                catContainer.appendChild(catTitle)
                catContainer.appendChild(catDesc)

                cont++

            })
        }).catch(function() {
            console.log(error)
        })

}

function load_bodyworks() {
    ajaxPromise("GET", "modules/home/ctrl/controller_home.php?op=list_bodyworks", "json")
        .then(function(json) {

            load_title('Bodyworks', 'load_bodyworks')

            let container = document.createElement('div')
            let row = document.createElement('div')
            let swiper = document.createElement('div')
            let swiperWrapper = document.createElement('div')
            let buttPrev = document.createElement('div')
            let buttNext = document.createElement('div')

            container.className = 'container'
            row.className = 'row'
            swiper.className = 'swiper'
            swiperWrapper.className = 'swiper-wrapper'
            buttPrev.className = 'swiper-button-prev'
            buttNext.className = 'swiper-button-next'

            document.getElementById('load_bodyworks').appendChild(container)
            container.appendChild(row)
            row.appendChild(swiper)
            swiper.appendChild(swiperWrapper)
            swiper.appendChild(buttPrev)
            swiper.appendChild(buttNext)

            $.each(json, function(index, value) {

                let swiperSlide = document.createElement('div')
                let mCard = document.createElement('div')
                let divImage = document.createElement('div')
                let nameBrand = document.createElement('div')

                swiperSlide.className = "swiper-slide m-slide__item"
                mCard.className = "m-card"
                divImage.className = "m-card__header clicktoredirect bodyworkredirect"
                divImage.id = value.id_bodywork
                divImage.style = 'background-image: url("' + value.photo_bodywork + '");'

                nameBrand.className = "m-card__body"
                nameBrand.textContent = value.name_bodywork

                swiperWrapper.appendChild(swiperSlide)
                swiperSlide.appendChild(mCard)
                mCard.appendChild(divImage)
                mCard.appendChild(nameBrand)
            });

            const swiper2 = new Swiper('.swiper', {
                // Optional parameters
                direction: 'horizontal',
                slidesPerView: 3,
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

            $.each(json, function(index, value) {

            })
        }).catch(function() {
            console.log(error)
        })
}

function redirect() {
    $(document).on('click', '.clicktoredirect', function() {
        let filtros = {
            id_brands: 'Allbrand',
            id_models: 'Allmodels',
            color: 'Allcolors',
            category: 'Allcategories',
            city: 'Allcities',
            bodywork: 'Allbody'
        }

        let array = $(this).attr('class').split(' ')
        let value = $(this).attr('id')

        console.log(value);
        $.each(array, function(indexInArray, valueOfElement) {

            if (valueOfElement == 'clicktoredirect') {

                $.each(array, function(indexInArray, valueOfRedirect) {
                    if (valueOfRedirect == 'brandredirect') {
                        filtros.id_brands = value
                    }

                    if (valueOfRedirect == 'categoryredirect') {
                        filtros.category = value

                    }

                    if (valueOfRedirect == 'bodyworkredirect') {
                        filtros.bodywork = value
                    }
                });

            }

        });

        localStorage.setItem('filters', JSON.stringify(filtros))

        console.log(localStorage.getItem('filters'));
        localStorage.setItem('pagination', 0)
        window.location.href = 'index.php?modules=controller_shop' //fer el window location al shop, list
    });
}

function load_all() {
    load_brands();
    load_categories();
    load_bodyworks();
}

$(document).ready(function() {
    load_all();
    redirect()
})