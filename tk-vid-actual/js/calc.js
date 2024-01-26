$(function() {
    // Определение глобальных переменных
    window.gon = {};
    gon.locale = "ru";
    gon.req_tk = "QmVhcmVyIGV5SmhiR2NpT2lKSVV6STFOaUo5LmV5SnpkV0lpT2prMExDSmxl\nSEFpT2pFM01EVTROVFUyTkRkOS5wbll3NUxYMU1seHlzcnZtdlhoZ0dyOS1S\nMUxIbWlaSkM0RnNXcWVYQzI4\n";
    gon.kw = "кВт";
    gon.hp = "л.с";
    gon.option_label_category_group = "Выберите категорию...";
    gon.option_label_manufacturer = "Выберите производителя...";
    gon.option_label_series = "Выберите модель...";
    gon.option_label_engine_size = "Выберите объем двигателя...";
    gon.option_label_model = "Выберите технику...";
    gon.option_label_search = "Быстрый поиск...";
    gon.not_available = false;
    gon.plate_text = {
        "2": "ЛЕГКОВЫЕ А/М",
        "7": "ЛЕГКИЕ ГРУЗОВЫЕ А/М",
        "1": "КОММЕРЧЕСКИЕ А/М",
        "5": "МОТОТЕХНИКА",
        "3": "СЕЛЬСКОХОЗЯЙСТВЕННАЯ ТЕХНИКА",
        "6": "ИНДУСТРИАЛЬНОЕ ОБОРУДОВАНИЕ",
        "4": "ВНЕДОРОЖНАЯ ТЕХНИКА"
    };

    $('#calc-search').select2({
        placeholder: gon.option_label_search,
        language: "ru",
        data: []
    });


    // Функция для создания URL
    function createUrl(base, params) {
        const url = new URL(base);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
        return url;
    }

    // Общая функция для форматирования результатов
    function formatResult(item, imageUrl) {
        if (!item.id) {
            return item.text;
        }
        const imageTag = imageUrl ? `<img src="${imageUrl}" alt="${item.name}" class="img-flag"> ` : '';
        return $(`<span>${imageTag}${item.name}</span>`);
    }

    // Инициализация Select2 для категорий
    $('#selectors_category_group').select2({
        placeholder: gon.option_label_category_group,
        templateResult: function(category) {
            return formatResult(category, "images/car-icon.svg");
        },
        templateSelection: function(category) {
            return formatResult(category, "images/car-icon.svg");
        },
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
                            name: item.name,
                        };
                    })
                };
            }
        }
    });

    // Инициализация Select2 для производителей
    $('#selectors_manufacturer').select2({
        placeholder: gon.option_label_manufacturer,
        templateResult: function(manufacturer) {
            return formatResult(manufacturer, manufacturer.logo);
        },
        templateSelection: function(manufacturer) {
            return formatResult(manufacturer, manufacturer.logo);
        },
        language: "ru",
        data: []
    }).prop('disabled', true);

    // Обработка выбора категории и обновление производителей
    $('#selectors_category_group').on('select2:select', function (e) {
        const categoryId = e.params.data.id;

        $('#selectors_manufacturer').select2({
            placeholder: gon.option_label_manufacturer,
            templateResult: function(manufacturer) {
                return formatResult(manufacturer, manufacturer.logo);
            },
            templateSelection: function(manufacturer) {
                return formatResult(manufacturer, manufacturer.logo);
            },
            language: "ru",
            ajax: {
                url: function() {
                    return createUrl(`https://lubribase.ru/${gon.locale}/api/v1/category_groups/${categoryId}/manufacturers/`, {
                        'filter[logic]': 'and',
                        'filter[filters][0][field]': 'id',
                        'filter[filters][0][operator]': 'eq',
                        'filter[filters][0][value]': categoryId
                    });
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
                                name: item.name,
                                logo: item.logo_image,
                            };
                        })
                    };
                }
            }
        }).prop('disabled', false);
    });

    // Инициализация Select2 для серий
    $('#selectors_series').select2({
        placeholder: gon.option_label_series,
        templateResult: function(series) {
            return formatResult(series, null);
        },
        templateSelection: function(series) {
            return formatResult(series, null);
        },
        language: "ru",
        data: []
    }).prop('disabled', true);

    // Обработка выбора производителя и обновление серий
    $('#selectors_manufacturer').on('select2:select', function (e) {
        const manufacturerId = e.params.data.id;
        const categoryId = $('#selectors_category_group').select2('data')[0].id; // Получение выбранной категории

        $('#selectors_series').select2({
            placeholder: gon.option_label_series,
            templateResult: function(series) {
                return formatResult(series, null);
            },
            templateSelection: function(series) {
                return formatResult(series, null);
            },
            language: "ru",
            ajax: {
                url: function() {
                    return createUrl(`https://lubribase.ru/${gon.locale}/api/v1/category_groups/${categoryId}/manufacturers/${manufacturerId}/series/`, {
                        'filter[logic]': 'and',
                        'filter[filters][0][field]': 'id',
                        'filter[filters][0][operator]': 'eq',
                        'filter[filters][0][value]': manufacturerId
                    });
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
                                name: item.name,
                            };
                        })
                    };
                }
            }
        }).prop('disabled', false);
    });

    // Инициализация Select2 для размеров двигателя
    $('#selectors_engine_sizes').select2({
        placeholder: gon.option_label_engine_size,
        templateResult: function(engine) {
            return formatResult(engine, null);
        },
        templateSelection: function(engine) {
            return formatResult(engine, null);
        },
        language: "ru",
        data: []
    }).prop('disabled', true);

    // Обработка выбора серии и обновление размеров двигателя
    $('#selectors_series').on('select2:select', function (e) {
        const seriesId = e.params.data.id;
        const manufacturerId = $('#selectors_manufacturer').select2('data')[0].id; // Получение выбранного производителя
        const categoryId = $('#selectors_category_group').select2('data')[0].id; // Получение выбранной категории

        $('#selectors_engine_sizes').select2({
            placeholder: gon.option_label_engine_size,
            templateResult: function(engine) {
                return formatResult(engine, null);
            },
            templateSelection: function(engine) {
                return formatResult(engine, null);
            },
            language: "ru",
            ajax: {
                url: function() {
                    return createUrl(`https://lubribase.ru/${gon.locale}/api/v1/category_groups/${categoryId}/manufacturers/${manufacturerId}/series/${seriesId}/engine_sizes/`, {
                        'filter[logic]': 'and',
                        'filter[filters][0][field]': 'id',
                        'filter[filters][0][operator]': 'eq',
                        'filter[filters][0][value]': seriesId
                    });
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
                                name: item.volume,
                            };
                        })
                    };
                }
            }
        }).prop('disabled', false);
    });

    // Инициализация Select2 для моделей
    $('#selectors_models').select2({
        placeholder: gon.option_label_model,
        templateResult: function(model) {
            return formatResult(model, null);
        },
        templateSelection: function(model) {
            return formatResult(model, null);
        },
        language: "ru",
        data: []
    }).prop('disabled', true);

    // Обработка выбора размера двигателя и обновление моделей
    $('#selectors_engine_sizes').on('select2:select', function (e) {
        const engineSizeId = e.params.data.id;
        const seriesId = $('#selectors_series').select2('data')[0].id; // Получение выбранной серии
        const manufacturerId = $('#selectors_manufacturer').select2('data')[0].id; // Получение выбранного производителя
        const categoryId = $('#selectors_category_group').select2('data')[0].id; // Получение выбранной категории

        $('#selectors_models').select2({
            placeholder: gon.option_label_model,
            templateResult: function(model) {
                return formatResult(model, null);
            },
            templateSelection: function(model) {
                return formatResult(model, null);
            },
            language: "ru",
            ajax: {
                url: function() {
                    return createUrl(`https://lubribase.ru/${gon.locale}/api/v1/category_groups/${categoryId}/manufacturers/${manufacturerId}/equipment/`, {
                        'filter[logic]': 'and',
                        'filter[filters][0][field]': 'selectors_manufacturer_id',
                        'filter[filters][0][operator]': 'eq',
                        'filter[filters][0][value]': manufacturerId,
                        'filter[filters][1][field]': 'selectors_series_id',
                        'filter[filters][1][operator]': 'eq',
                        'filter[filters][1][value]': seriesId,
                        'filter[filters][2][field]': 'selectors_engine_size_volume',
                        'filter[filters][2][operator]': 'eq',
                        'filter[filters][2][value]': engineSizeId
                    });
                },
                dataType: 'json',
                headers: {
                    "Authorization": atob(gon.req_tk)
                },
                processResults: function (data) {
                    return {
                        results: data.results.map(function(item) {
                            return {
                                id: item.model,
                                drive_types: item.drive_types,
                                engine_output_hp: item.engine_output_hp,
                                engine_output_kw: item.engine_output_kw,
                                fuel_type_name: item.fuel_type_name,
                                fuel_type_name_en: item.fuel_type_name_en,
                                generations: item.generations,
                                mid: item.mid,
                                name: item.model,
                                year_from: item.year_from,
                                year_to: item.year_to
                            };
                        })
                    };
                }
            }
        }).prop('disabled', false);
    });
});
