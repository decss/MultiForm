$(function(){ 
    $.widget( "costum.multiform", {
        options: {
            navEl:          null,
            loadingEl:      '#multiform #multiform-loading',
            buttonsEl:      '#multiform #multiform-buttons',
            url:            null,
            wrapTag:        null,
            complete:       null,
            step:           1,
            hashStep:       false,
        },
        _create: function() {
            console.log('_create()');

            this.options   = $.extend({ }, this.options, {
                _pageEl:     '#multiform #multiform-page',
                _btnPrevEl:  '#msprev',
                _btnNextEl:  '#msnext',
                _btnSubmEl:  '#mssubm',
                _config:    {}, 
                _page:      {}, 
            });
            var requestUrl = this._getRequestUrl( ['page', 'config'] );
            var _this      = this;
            
            // Apply Buttons listeners
            $( this.element ).on('click', this.options._btnPrevEl + ', ' + this.options._btnNextEl, function() {
                if ( '#' + this.id == _this.options._btnPrevEl ) {
                    _this._setOption('step', _this.options.step - 1);
                }
                if ( '#' + this.id == _this.options._btnNextEl ) {
                    _this._setOption('step', _this.options.step + 1);
                }
            });

            // Prepare progressBar, Page, Buttons, Loading node
            $( this.options.navEl ).hide();
            $( this.options._pageEl ).hide();
            $( this.options.buttonsEl ).hide();
            // Show loading bar
            if ( this.options.loadingEl ) {
                $( this.options.loadingEl ).fadeIn(200);
            };

            // Get config apd first page
            $.get( requestUrl, function( response ) {
                if ( response && response.status == "success" ) {
                    var progressBar,
                        buttons,
                        config = response.data.config,
                        page   = response.data.page;
                    _this.options._config = config;
                    _this.options._page   = page;
                    progressBar           = _this._buildProgressBar();
                    buttons               = _this._buildButtons();

                    // Apply progressBar
                    if ( _this.options.navEl && progressBar ) {
                        _this._applyProgressbar( progressBar );
                    }
                    // Apply buttons
                    if ( _this.options.buttonsEl && buttons ) {
                        _this._applyButtons( buttons );
                    }

                    _this._update();
                }
            }, 'json');
        },

        _setOption: function( key, value ) {
            console.log('_setOption()');
            this.options[ key ] = value;
            this._update();
        },

        _toggleButtons: function() {
            step = this.options._page.step;

            if (step == 1) {
                $(this.options._btnPrevEl).prop('disabled', true);
                $(this.options._btnNextEl).prop('disabled', false);
                $(this.options._btnSubmEl).prop('disabled', true);

                // if (this.options._config.stepsRequired[step] == false) {
                //     $(this.options._btnSubmEl).prop('disabled', false);
                // } else {
                //     $(this.options._btnSubmEl).prop('disabled', true);
                // }
            } else if (step >= this.options._config.stepsCount) {
                $(this.options._btnPrevEl).prop('disabled', false);
                $(this.options._btnNextEl).prop('disabled', true);
                $(this.options._btnSubmEl).prop('disabled', false);

                // if (this.options._config.stepsRequired[step] == false) {
                //     $(this.options._btnSubmEl).prop('disabled', false);
                // } else {
                //     $(this.options._btnSubmEl).prop('disabled', true);
                // }
            } else {
                $(this.options._btnPrevEl).prop('disabled', false);
                $(this.options._btnNextEl).prop('disabled', false);
                $(this.options._btnSubmEl).prop('disabled', true);

                // if (this.options._config.stepsRequired[step] == false) {
                //     $(this.options._btnSubmEl).prop('disabled', false);
                // } else {
                //     $(this.options._btnSubmEl).prop('disabled', true);
                // }
            }
        },

        _toggleProgressbar: function() {
            console.log('_toggleProgressbar()');

            $( this.options.navEl + ' li' ).each(function() {
                if ( $(this).data('step') < step) {
                    $(this).removeClass('blocked active').addClass('passed');
                } else if ( $(this).data('step') == step) {
                    $(this).removeClass('blocked passed').addClass('active');
                } else {
                    $(this).removeClass('active passed')
                    // .addClass('blocked');
                }
            });
        },

        _render: function() {
            // Hide loading
            $( this.options.loadingEl ).hide();

            // Enrich page content
            this._applyPage( this.options._page );

            // Toggle buttons
            this._toggleButtons();

            // toggle progressbar
            this._toggleProgressbar();

            // Show progressBar and page
            $( this.options.navEl + ', ' + this.options._pageEl + ', ' + this.options.buttonsEl).fadeIn();
        },

        _update: function() {
            console.log('_update()');

            // when page is loaded
            /////////////////////////
            if ( this.options._page && this.options.step == this.options._page.step) {

                // Render page, buttons and progressbar
                this._render();


            // When page is changed
            /////////////////////////
            } else {
                // var requestUrl = this._getRequestUrl( 'page' );
                var requestUrl  = this._getRequestUrl( ['page'] ),
                    pageHeight  = $( this.options._pageEl ).height(),
                    _this       = this;

                // Prepare progressBar, Page, Buttons, Loading node
                $( this.options._pageEl ).hide();
                // Show loading bar
                if ( this.options.loadingEl ) {
                    $( this.options.loadingEl ).height( pageHeight );
                    $( this.options.loadingEl ).fadeIn(200);
                };

                // Ajax request
                $.get( requestUrl, function( response ) {
                    if ( response && response.status == "success" ) {
                        var progressBar,
                            buttons,
                            page = response.data.page;

                        // Set new page data
                        _this.options._page = page;

                        // Render page, buttons and progressbar
                        _this._render();
                    }
                }, 'json')
                // .done(function() { alert( "second success" ); })
                // .fail(function() { alert( "error" ); })
                // .always(function() { alert( "finished" ); })
                ;  

            }
        },

        _buildButtons: function() {
            console.log('_buildButtons()');

            var buttons = '';

            buttons += this.options._config.buttons.prev;
            buttons += this.options._config.buttons.next;
            buttons += this.options._config.buttons.subm;

            return buttons;
        },
        _buildProgressBar: function() {
            console.log('_buildProgressBar()');
            
            var progressBar = '',
                cls         = '',
                steps       = this.options._config.steps;

            for ( var i = 0; i < steps.length; i++ ) {
                cls = (steps[i].cls) ? ' class="' + steps[i].cls + '"' : '';
                progressBar += '<li' + cls + ' data-step="' + steps[i].step + '">' + steps[i].title + '</li>';
            }
            progressBar = (progressBar) ? '<ul>' + progressBar + '</ul>' : '';

            return progressBar;
        },
        _getRequestUrl: function( actions ) {
            var params      = {};
            params.step     = this.options.step;
            params.actions  = actions;
            var requestUrl  = this.options.url + '?' + $.param( params );

            return requestUrl;
        },
        _setHashStep: function( step ) {
            window.location.hash = ( step ) ? "step-" + step : "";
        },
        _applyProgressbar: function( progressBar ) {
            console.log("_applyProgressbar()");
            $( this.options.navEl ).html( progressBar );
        },
        _applyButtons: function( buttons ) {
            console.log("_applyButtons()");
            $( this.options.buttonsEl ).html( buttons );
        },
        _applyPage: function( page ) {
            console.log("_applyPage()");
            var pageHtml = page.html;

            // var buttonsHtml = '';
            // if ( this.options.step <= 1) {
            //     buttonsHtml += this.options._config.buttons.next;
            // } else if ( this.options.step >= page.stepsCount) {
            //     buttonsHtml += this.options._config.buttons.prev;
            //     buttonsHtml += this.options._config.buttons.subm;
            // } else {
            //     buttonsHtml += this.options._config.buttons.prev;
            //     buttonsHtml += this.options._config.buttons.next;
            // }
            // if ( this.options.buttonsEl && $( this.options.buttonsEl ).length > 0 ) {
            //     $( this.options.buttonsEl ).html( buttonsHtml );
            // } else {
            //     pageHtml += buttonsHtml;
            // }

            if ( this.options.wrapTag ) {
                pageHtml = '<' + this.options.wrapTag + '>' + pageHtml + '</' + this.options.wrapTag + '>';
            }

            $( this.options._pageEl ).html( pageHtml );
        },


    });


});





$(function(){ 


    var a = $('#multiform').multiform({
        navEl:      '#multiform-pbar',
        // buttonsEl:  '#multiform .mf-buttons',
        loadingEl:  '#multiform #multiform-loading',
        url:        'ajax.php',
        // wrapTag:    'div',
        loading:    true,
        hashStep:   true
    });

    console.log (a);

    // $('#multiform').multiform({step: 2});



    // console.log ( $('#multiform').data('costumMsform').options );

    // $('#multiform').multiform('method', {options: 123});


});
