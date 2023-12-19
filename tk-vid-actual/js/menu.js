(function (window){
	'use strict';

    window.Alpha.Menu = function (params)
    {
        this.params = {};
        this.cloneContainer = null;
        
        if (params.containerId !== undefined)
        {
            this.params = params;
            this.init();
        }
    };
    
    window.Alpha.Menu.prototype = {
        
        init: function ()
        {
            var _ = this;
            this.cloneContainer = $('#' + this.params.containerId).clone();

            $('body').on('mouseover', '#' + this.params.containerId + ' li', function () {
                if ($(this).hasClass('has-sub'))
                    $(this).addClass('open');

                if (parseInt($(this).data('depth')) > 0) {
                    var depth = $('#' + _.containerId + ' li.open').length;

                    // set max height
                    var maxHeight = $(this).hasClass('has-sub') ? parseInt($(this).find("> .sub")
                            .outerHeight(true)) : 0;

                    $('#' + _.containerId + ' li.open.has-sub').each(function () {

                        var currentHeight = parseInt($(this).find("> .sub").outerHeight(true));
                        if (currentHeight > maxHeight)
                            maxHeight = currentHeight;
                    });

                    $('#' + _.containerId + ' .sub').css('min-height', maxHeight + 'px');
                }
            });

            $('body').on('mouseout', '#' + _.containerId + ' li', function () {
                if ($(this).hasClass('has-sub'))
                    $(this).removeClass('open');

                if (parseInt($(this).data('depth')) > 0) {
                    $('#' + _.containerId + ' .sub').css('min-height', 'auto');
                }
            });


            this.resizeCallback();
            $(window).resize(BX.delegate(this.resizeCallback, this));

        },

        resizeCallback: function ()
        {
            $('#' + this.params.containerId).html(this.cloneContainer.html());

            var container = $('#' + this.params.containerId);
            var avaliableWidth = parseInt(container.outerWidth()) - 48, sumWidth = 0, arMoreItems = [];

            container.removeClass('calc');

            container.find(" > li").each(function (index, target) {

                sumWidth += parseInt($(target).outerWidth(true));

                if (sumWidth > avaliableWidth)
                {
                    arMoreItems.push($(target));
                    $(target).remove();
                }
            });

            if (arMoreItems.length > 0)
            {
                var moreItem = $('<li data-depth="1" class="has-sub offset-left"><a href="javascript:void(0)" class="more"></a><div class="sub"><ul class="menu-list-1 reset-ul-list"></ul></div></li>'), moreItemSub = moreItem.find(".menu-list-1");

                for (var i = 0; i < arMoreItems.length; i++)
                {
                    moreItemSub.append(arMoreItems[i]);
                }

                moreItem.find("li.has-sub").each(function () {
                    var depth = parseInt($(this).data('depth') + 1);
                    if (depth < 4)
                    {
                        $(this).attr('data-depth', depth);
                        $(this).find("> .sub > ul").removeClass('menu-list-1').removeClass('menu-list-2').removeClass('menu-list-3').addClass('menu-list-' + depth);
                    } else
                    {
                        $(this).removeClass('has-sub');
                        $(this).find("> .sub").remove();
                    }
                });


                container.append(moreItem);
            }

            container.addClass('calc');

        }
        
    };
    
})(window);