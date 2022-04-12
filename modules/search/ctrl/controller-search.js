function load_search() {

    let container = document.getElementById('container-serch-bar')

    let container_select1 = document.createElement('div')
    let select1 = document.createElement('select')
    let option11 = document.createElement('option')

    container_select1.className = 'col-md-3'
    select1.className = 'form-control'
    select1.name = 'category'
    select1.id = 'category-search'
    select1.style = 'height: 54px;'

    option11.value = 'Allcategories'
    option11.appendChild(document.createTextNode('Category'))

    container.appendChild(container_select1)
    container_select1.appendChild(select1)
    select1.appendChild(option11)

    let container_select2 = document.createElement('div')
    let select2 = document.createElement('select')
    let option21 = document.createElement('option')

    container_select2.className = 'col-md-3'
    select2.className = 'form-control'
    select2.name = 'brand'
    select2.id = 'brand-search'
    select2.style = 'height: 54px;'

    option21.value = 'Allbrand'
    option21.appendChild(document.createTextNode('Brands'))

    container.appendChild(container_select2)
    container_select2.appendChild(select2)
    select2.appendChild(option21)

    ajaxPromise("GET", "modules/search/ctrl/controller-search.php?op=list_info_search", "json")
        .then(function(info) {
            // console.log(info)

            $.each(info[0], function(indexInArray, value) {

                // console.log(value.name_category);
                let option12 = document.createElement('option')

                option12.value = value.id_category
                option12.appendChild(document.createTextNode(value.name_category))

                select1.appendChild(option12)
            });

            $.each(info[1], function(indexInArray, value) {

                // console.log(value);
                let option22 = document.createElement('option')

                option22.value = value.id_brand
                option22.appendChild(document.createTextNode(value.name_brand))

                select2.appendChild(option22)
            });

        }).catch(function() {
            console.log('error load type search')
        })

    let container_inputText = document.createElement('div')
    let inputText = document.createElement('input')

    container_inputText.className = 'col-md-4'
    inputText.className = 'form-control'
    inputText.id = 'city-search'
    inputText.placeholder = 'City'
    inputText.type = 'text'
    inputText.name = 'city-search'

    container.appendChild(container_inputText)
    container_inputText.appendChild(inputText)

    $(inputText).on('keyup', function() {


        if (document.getElementsByClassName('searches')) {
            $('.searches').remove();
        }

        if (inputText.value != '') {
            ajaxPromise("GET", "modules/search/ctrl/controller-search.php?op=autocomplete&city=" + inputText.value, "json")
                .then(function(info) {

                    let searchInfo = document.createElement('div')

                    searchInfo.className = 'searches'

                    container.appendChild(searchInfo)

                    $.each(info, function(indexInArray, value) {

                        let cityoption = document.createElement('div')

                        cityoption.className = 'city-option'
                        cityoption.appendChild(document.createTextNode(value.city))

                        searchInfo.appendChild(cityoption)

                        $(cityoption).on('click', function() {
                            inputText.value = value.city
                            $('.searches').remove();
                        });

                    });

                }).catch(function() {
                    console.log('error load type search')
                })
        }

    });

    $(document).on('click', function() {
        if (document.getElementsByClassName('searches')) {
            $('.searches').remove();
        }
    });

    let buttonSearch = document.createElement('div')
    let serachImg = document.createElement('img')

    buttonSearch.id = 'button-search'
    serachImg.src = 'view/images/search-icon.png'

    container.appendChild(buttonSearch)
    buttonSearch.appendChild(serachImg)

    let button = document.getElementById('button-search')

    $(button).on('click', function() {
        search()
    });

}

function search() {

    console.log('Search')

    let filtros = {
        id_brands: '',
        id_models: 'Allmodels',
        color: 'Allcolors',
        category: '',
        city: '',
        bodywork: 'Allbody'
    }


    if ($('#category-search').val() != 'Allcategories') {
        filtros.category = $('#category-search').val()
    } else {
        filtros.category = 'Allcategories'
    }

    if ($('#brand-search').val() != 'Allbrand') {
        filtros.id_brands = $('#brand-search').val()
    } else {
        filtros.id_brands = 'Allbrand'
    }

    if ($('#city-search').val() != '') {
        filtros.city = $('#city-search').val()
    } else {
        filtros.city = 'Allcities'
    }


    localStorage.setItem('filters', JSON.stringify(filtros))
    localStorage.setItem('pagination', 0)


    window.location.href = 'index.php?modules=controller_shop'

}

$(document).ready(function() {
    load_search()
});