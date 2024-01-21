$(function() {

    window.gon={};
    gon.locale="ru";
    gon.req_tk="QmVhcmVyIGV5SmhiR2NpT2lKSVV6STFOaUo5LmV5SnpkV0lpT2prMExDSmxl\nSEFpT2pFM01EVTNOekkxTmpsOS5IWjlNc1p2VVlJTUIxRWxnaEhHYXBlREM4\nNHBiaS1lck9ScmJxTHRyT3VN\n";
    gon.kw="кВт";
    gon.hp="л.с";
    gon.option_label_category_group="Выберите категорию...";
    gon.option_label_manufacturer="Выберите производителя...";
    gon.option_label_series="Выберите модель...";
    gon.option_label_engine_size="Выберите объем двигателя...";
    gon.option_label_model="Выберите технику...";
    gon.option_label_search="Быстрый поиск...";
    gon.not_available=false;
    gon.plate_text={
        "2":"ЛЕГКОВЫЕ А/М",
        "7":"ЛЕГКИЕ ГРУЗОВЫЕ А/М",
        "1":"КОММЕРЧЕСКИЕ А/М",
        "5":"МОТОТЕХНИКА",
        "3":"СЕЛЬСКОХОЗЯЙСТВЕННАЯ ТЕХНИКА",
        "6":"ИНДУСТРИАЛЬНОЕ ОБОРУДОВАНИЕ",
        "4":"ВНЕДОРОЖНАЯ ТЕХНИКА"
    };

    /*
    const categoryIcons = {
        1: 'fa-truck-container',
        2: 'fa-car',
        3: 'fa-tractor',
        4: 'fa-truck-monster',
        5: 'fa-motorcycle',
        6: 'fa-train-subway',
        7: 'fa-truck'
    };
    */

    $('#calc-search').select2({
        placeholder: gon.option_label_search,
        language: "ru",
        data: []
    });

    var categoryId,
        manufacturerId,
        seriesId,
        modelId;

    $('#selectors_category_group').select2({
        placeholder: gon.option_label_category_group,
        templateResult: formatCategory,
        templateSelection: formatCategorySelection,
        language: "ru",
        ajax: {
            url: 'https://lubribase.ru/' + gon.locale + '/api/v1/category_groups/',
            dataType: 'json',
            headers: {
                "Authorization": atob(gon.req_tk)
            },
            processResults: function (data) {
                return {
                    results: data.results.map(function(item) {
                        return {
                            id: item.id,
                            text: item.name,
                        };
                    })
                };
            }
        }
    });

    function formatCategory(category) {
        if (!category.id) {
            return category.text;
        }

        var $category = $(
            `<span><img src="images/car-icon.svg" alt="${category.text}"> ${category.text}</span>`
        );
        return $category;
    };

    function formatCategorySelection(state) {
        if (!state.id) {
            return state.text;
        }

        var $state = $(
            `<span><img src="images/car-icon.svg" alt="${state.text}"> ${state.text}</span>`
        );
        return $state;
    };


    $('#selectors_manufacturer').select2({
        placeholder: gon.option_label_manufacturer,
        templateResult: formatManufacturer,
        templateSelection: formatManufacturerSelection,
        language: "ru",
        data: []
    }).prop('disabled', true);

    $('#selectors_category_group').on('select2:select', function (e) {
        categoryId = e.params.data.id;

        $('#selectors_manufacturer').select2({
            placeholder: gon.option_label_manufacturer,
            templateResult: formatManufacturer,
            templateSelection: formatManufacturerSelection,
            language: "ru",
            ajax: {
                url: function() {
                    const baseUrl = `https://lubribase.ru/${gon.locale}/api/v1/category_groups/${categoryId}/manufacturers/`;
                    const url = new URL(baseUrl);
                    const params = {
                        'filter[logic]': 'and',
                        'filter[filters][0][field]': 'id',
                        'filter[filters][0][operator]': 'eq',
                        'filter[filters][0][value]': categoryId
                    };

                    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
                    return url;
                },
                dataType: 'json',
                headers: {
                    "Authorization": atob(gon.req_tk)
                },
                processResults: function (data) {
                    return {
                        results: data.results.map(function(item) {
                            return {
                                id: item.id,
                                text: item.name,
                                img: item.logo_image,
                            };
                        })
                    };
                }
            }
        }).prop('disabled', false);

    });

    function formatManufacturer(manufacturer) {
        if (!manufacturer.id) {
            return manufacturer.text;
        }

        const imageTag = manufacturer.img ? `<img src="${manufacturer.img}" alt="${manufacturer.text}" class="img-flag"> ` : '';
        var $manufacturer = $(
            `<span>${imageTag}${manufacturer.text}</span>`
        );
        return $manufacturer;
    };

    function formatManufacturerSelection(manufacturer) {
        if (!manufacturer.id) {
            return manufacturer.text;
        }

        const imageTag = manufacturer.img ? `<img src="${manufacturer.img}" alt="${manufacturer.text}" class="img-flag"> ` : '';
        var $manufacturer = $(
            `<span>${imageTag}${manufacturer.text}</span>`
        );
        return $manufacturer;
    };


    $('#selectors_series').select2({
        placeholder: gon.option_label_series,
        templateResult: formatSeries,
        templateSelection: formatSeriesSelection,
        language: "ru",
        data: []
    }).prop('disabled', true);

    $('#selectors_manufacturer').on('select2:select', function (e) {
        manufacturerId = e.params.data.id;

        $('#selectors_series').select2({
            placeholder: gon.option_label_series,
            templateResult: formatSeries,
            templateSelection: formatSeriesSelection,
            language: "ru",
            ajax: {
                url: function() {
                    const baseUrl = `https://lubribase.ru/${gon.locale}/api/v1/category_groups/${categoryId}/manufacturers/${manufacturerId}/series/`;
                    const url = new URL(baseUrl);
                    const params = {
                        'filter[logic]': 'and',
                        'filter[filters][0][field]': 'id',
                        'filter[filters][0][operator]': 'eq',
                        'filter[filters][0][value]': manufacturerId
                    };

                    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
                    return url;
                },

                dataType: 'json',
                headers: {
                    "Authorization": atob(gon.req_tk)
                },
                processResults: function (data) {
                    return {
                        results: data.results.map(function(item) {
                            return {
                                id: item.id,
                                text: item.name,
                            };
                        })
                    };
                }
            }
        }).prop('disabled', false);
    });

    function formatSeries(series) {
        if (!series.id) {
            return series.text;
        }
        //const imageTag = series.img ? `<img src="${series.img}" alt="${series.text}" class="img-flag"> ` : '';
        var $series = $(
            `<span>${series.text}</span>`
        );
        return $series;
    };


    function formatSeriesSelection(series) {
        if (!series.id) {
            return series.text;
        }
        //const imageTag = series.img ? `<img src="${series.img}" alt="${series.text}" class="img-flag"> ` : '';
        var $series = $(
            `<span>${series.text}</span>`
        );
        return $series;
    };


    $('#selectors_engine_sizes').select2({
        placeholder: gon.option_label_engine_size,
        templateResult: formatEngine,
        templateSelection: formatEngineSelection,
        language: "ru",
        data: []
    }).prop('disabled', true);

    $('#selectors_series').on('select2:select', function (e) {
        seriesId = e.params.data.id;

        $('#selectors_engine_sizes').select2({
            placeholder: gon.option_label_engine_size,
            templateResult: formatEngine,
            templateSelection: formatEngineSelection,
            language: "ru",
            ajax: {
                url: 'https://lubribase.ru/' + gon.locale + '/api/v1/category_groups/' + categoryId + '/manufacturers/' + manufacturerId + '/series/' + seriesId + '/engine_sizes/',

                url: function() {
                    const baseUrl = `https://lubribase.ru/${gon.locale}/api/v1/category_groups/${categoryId}/manufacturers/${manufacturerId}/series/`;
                    const url = new URL(baseUrl);
                    const params = {
                        'filter[logic]': 'and',
                        'filter[filters][0][field]': 'id',
                        'filter[filters][0][operator]': 'eq',
                        'filter[filters][0][value]': manufacturerId
                    };

                    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
                    return url;
                },

                dataType: 'json',
                headers: {
                    "Authorization": atob(gon.req_tk)
                },
                processResults: function (data) {
                    return {
                        results: data.results.map(function(item) {
                            return {
                                id: item.volume,
                                text: item.volume,
                            };
                        })
                    };
                }
            }
        }).prop('disabled', false);
    });

    function formatEngine(engine) {

        var $engine = $(
            `<span>${engine.text}</span>`
        );
        return $engine;
    };


    function formatEngineSelection(engine) {

        var $engine = $(
            `<span>${engine.text}</span>`
        );
        return $engine;
    };


    $('#selectors_models').select2({
        placeholder: gon.option_label_model,
        templateResult: formatModel,
        templateSelection: formatModelSelection,
        language: "ru",
        data: []
    }).prop('disabled', true);

    $('#selectors_engine_sizes').on('select2:select', function (e) {
        modelId = e.params.data.id;

        $('#selectors_models').select2({
            placeholder: gon.option_label_engine_size,
            templateResult: formatModel,
            templateSelection: formatModelSelection,
            language: "ru",
            ajax: {
                url: 'https://lubribase.ru/' + gon.locale + '/api/v1/category_groups/' + categoryId + '/manufacturers/' + manufacturerId + '/series/' + seriesId + '/engine_sizes/',
                dataType: 'json',
                headers: {
                    "Authorization": atob(gon.req_tk)
                },
                processResults: function (data) {
                    return {
                        results: data.results.map(function(item) {
                            return {
                                id: item.volume,
                                text: item.volume,
                            };
                        })
                    };
                }
            }
        }).prop('disabled', false);
    });

    function formatModel(model) {

        var $model = $(
            `<span>${model.text}</span>`
        );
        return $model;
    };

    function formatModelSelection(model) {

        var $model = $(
            `<span>${model.text}</span>`
        );
        return $model;
    };




});