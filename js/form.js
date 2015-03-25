$(function(){ 
    $.widget( "costum.multiform", {
        options: {
            navEl:          null,
            loadingEl:      null,
            buttonsEl:      null,
            url:            null,
            wrapTag:        null,
            complete:       null,
            step:           1,
            hashStep:       false,
        },
        _create: function() {
            this.options = $.extend({}, this.options, {
                _data:          {}, 
                _buttonPrev:    '<input type="button" id="msprev" class="action-button" value="Previous">',
                _buttonNext:    '<input type="button" id="msnext" class="action-button" value="Next">',
                _buttonSubm:    '<input type="button" id="mssubm" class="action-button" value="Submit">',
            });

            var _this = this;

            $( this.element ).on('click', '#msprev, #msnext', function() {
                if ( this.id == "msprev" ) {
                    _this._setOption('step', _this.options.step - 1);
                }
                if ( this.id == "msnext" ) {
                    _this._setOption('step', _this.options.step + 1);
                }
            });



            this._update();
        },
        _setOption: function( key, value ) {
            console.log('_setOption()');
            this.options[ key ] = value;
            this._update();
        },
        _update: function() {
            console.log('_update()');

            $( this.element ).find( ".mf-page" ).hide();
            $( this.options.navEl ).hide();
            $( this.options.loadingEl ).hide();
            $( this.options.buttonsEl ).hide();

            // var progress = this.options.value + "%";
            // // this.element.text( progress );
            // if ( this.options.value == 100 ) {
            //     this._trigger( "complete", null, { value: 100 } );
            // }

            // prepare loading bar
            if ( this.options.loadingEl ) {
                $( this.options.loadingEl ).fadeIn(200);
            }

            var _this       = this;
            var _data       = this.options._data;
            var requestUrl  = this.options.url + '?step=' + this.options.step;

            // Ajax request
            $.get( requestUrl, function( response ) {
                if ( response && response.status == "success" ) {
                    _data = response.data;
                    console.log(_data);

                    // Set step from response
                    _this.options.step = _data.options.step;
                    if ( _this.options.hashStep ) {
                        _this._setHashStep( _data.options.step );
                    }

                    // Apply navigation bar
                    if ( _this.options.navEl && _data.nav ) {
                        _this._applyProgressbar( _data.nav );
                    }

                    // Apply page
                    if ( _data.page) {
                        _this._applyPage( _data );
                    }

                    if ( _this.options.loadingEl ) {
                        $( _this.options.loadingEl ).fadeOut( 200, function(){
                            $( _this.element ).find('.mf-page').fadeIn();
                            $( _this.options.navEl ).fadeIn();
                            $( _this.options.buttonsEl ).fadeIn();
                        });
                    } else {
                        $( _this.element ).find('.mf-page').fadeIn();
                        $( _this.options.navEl ).fadeIn();
                        $( _this.options.buttonsEl ).fadeIn();
                    }
                }
            }, 'json')
            // .done(function() { alert( "second success" ); })
            // .fail(function() { alert( "error" ); })
            // .always(function() { alert( "finished" ); })
            ;  
        },

        _setHashStep: function( step ) {
            window.location.hash = ( step ) ? "step-" + step : "";
        },
        _applyProgressbar: function( nav ) {
            $( this.options.navEl ).html( nav.html );
        },
        _applyPage: function( data ) {
            var pageHtml = data.page.html;

            var buttonsHtml = '';
            if ( this.options.step <= 1) {
                buttonsHtml += this.options._buttonNext;
            } else if ( this.options.step >= data.options.stepsCount) {
                buttonsHtml += this.options._buttonPrev;
                buttonsHtml += this.options._buttonSubm;
            } else {
                buttonsHtml += this.options._buttonPrev;
                buttonsHtml += this.options._buttonNext;
            }
            if ( this.options.buttonsEl ) {
                // $( this.options.buttonsEl ).html( data.buttons.html );
                $( this.options.buttonsEl ).html( buttonsHtml );
            } else {
                // pageHtml += data.buttons.html;
                pageHtml += buttonsHtml;
            }

            if ( this.options.wrapTag ) {
                pageHtml = '<' + this.options.wrapTag + '>' + pageHtml + '</' + this.options.wrapTag + '>';
            }

            $( this.element ).find('.mf-page').html( pageHtml );
        },


    });


});





$(function(){ 


    $('#multiform').multiform({
        navEl:      '.mf-nav',
        // buttonsEl:  '#multiform .mf-buttons',
        loadingEl:  '#multiform .mf-loading',
        url:        'ajax.php',
        // wrapTag:    'fieldset',
        loading:    true,
        hashStep:   true
    });

    // $('#multiform').multiform({step: 2});



    console.log ( $('#multiform').data('costumMsform').options );

    // $('#multiform').multiform('method', {options: 123});


});
