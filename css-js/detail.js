$(document).ready(function () {
    $('.container-fluid.loading').fadeOut(3000);
    // bắt đầu từ 0 đến 9 dấu - hoặc +, có từ 9 đến 15 số
    var regex_num = /^[0-9\-\+]{10,13}$/g;
    // là kí tự [0-9] hoặc [a-z] hoặc [A-Z] hoặc _
    var regex_userName = /^[\w]{4,10}$/g;
    // có 6 đến 10 kí tự, bao gồm ít nhất 2 số, 1 chữ hoa, không chứa kí tự đặc biệt.
    var regex_pass = /^(?=.*\d.*\d)(?=.*[A-Z])[\w]{6,10}$/g
    var temp =localStorage.length;
    var item_display_num = 4;
    var provinces_transport = $('.subsidiary-info__transport--content #provinces')
    var content = '<option value="">Chọn tỉnh</option>';
    
    /*auto focus vào ô search input */
    $('.row.header__operate>.header__search .header__search-text input').trigger('focus');
    for( let i=localStorage.length-item_display_num+1; i<=localStorage.length; i++){
        if(i>0){
            var value_storage = localStorage.getItem(i);
            $('.header__search-text-warp .header__search-history ul').prepend(`<li><a href="">${value_storage}</a></li>`)
        }
        else{
            return false;
        }
    }
    //kiểm tra dữ liệu đầu vào ở phần form-register và form-login
    function checkByRegex (idInput, spanErr, regex, textErr ) {

        $(idInput).on('change', function () {
            if(! regex.test($(idInput).val())){
                $(spanErr).text(textErr)
                $(idInput).focus();
            }
            else{
                $(spanErr).text('');
            }
        })
        $(idInput).on('input', function () {
            $(spanErr).text('');
        })
    }
    
    checkByRegex ('#phoneNumber', 'span.phone-err', regex_num, 'Vui lòng nhập lại SĐT' );
    checkByRegex('#userName', '.userName-err', regex_userName, 'Tên người dùng không có kí tự đặc biệt độ dài từ 4 đến 10 kí tự.');
    checkByRegex('#password', '.password-err', regex_pass, 'Mật khẩu có ít nhất 2 số và 1 chữ hoa. Độ dài từ 6 đến 10 kí tự.');

    //kiểm tra dữ liệu phần confirm password.
    $('#confirm-pass').on('change', function () {
       if( $(this).val() != $('#password').val() ?? $(this).trim().val() ==''){
           $('span.confirm-err').text('Mời nhập lại giá trị')
       }
    })

    // hiển thị form register
    $('.right-nav li.right-nav__register').on('click', function (e) {
        e.preventDefault();
        $('.modal').fadeIn(100);
        $('.modal__body .modal__body-register').fadeIn(100);
        $('.modal__body .modal__body-login').fadeOut(10);
    })

    //event khi user click vào chữ đăng nhập ở phần đăng kí
    $('#login-button1').on('click', function () {
        
         $('.modal__body-register').hide(10);
         $('.modal__body .modal__body-login').show(100);
         resetRegister ();
    })
    // xóa tất cả dữ liệu trong form-register khi tắt form
    function resetRegister () {
        $('#phoneNumber').val('');
        $('#userName').val('');
        $('#password').val('');
        $('#confirm-pass').val('');
        $('.modal__body>.modal__body-register>.register__body .form-group span').text('');
    }
    // tắt form register bằng cách ấn ra overlay
    $('.modal .modal__overlay').on('click', function () {
        $('.modal').fadeOut(100);
        resetRegister ();
        resetLogin ();
    })
    // tắt form register bằng cách ấn vào nút trở lại
    $('.register__body input.back-button').on('click', function() {
        $('.modal').fadeOut(100);
        resetRegister ();
    })
    // check điều kiện cho nút đăng kí.
    $('.register__body .form-group .register-confirm').on('click', function (e) {
        e.preventDefault();
        $('.register__body .form-group input[type="text"]').each(function(){
            if ($(this).val() == '' || $(this).parent().children('span').text() != ''){
                console.log(1);
                $('.register__body .form-group span.register-err').text('Xin đăng kí lại') 
                return false;  //out loop      
            }
        })
        if($('.register__body .form-group span.register-err').text() == ''){
            alert('Chúc mừng bạn đăng kí thành công');
        }
    })

    //event khi user click vào chữ đăng kí ở phần đăng nhập
     $('#login-button').on('click', function () {
         console.log( $('#login-button'))
         $('.modal__body .modal__body-login').hide();
         $('.modal__body-register').show();
         resetLogin ();
     })

     //event khi user click vào header đăng nhập
     $('.right-nav li.right-nav__login').on('click', function (e) {
         e.preventDefault();
         $('.modal').show();
         $('.modal__body .modal__body-login').show();
         $('.modal__body .modal__body-register').hide();
     })

     //event khi user click vào "trở lại" ở phần đăng nhập
     $('.modal__body-login button.back-button').on('click', function() {
        $('.modal').fadeOut(100);
        resetLogin ();
        
    })
    // reset login khi ẩn modal
    function resetLogin () {

        $('.modal__body-login #password-login').val('');
        $('.modal__body-login #userName-login').val('');
        $('.modal__body-login .login__content span').text('');
    }
    //validate lại userName và password ở phần login
    checkByRegex('#userName-login', '.userName-err-login', regex_userName, 'Tên người dùng không có kí tự đặc biệt độ dài từ 4 đến 10 kí tự.');
    checkByRegex('#password-login', '.password-err-login', regex_pass, 'Mật khẩu có ít nhất 2 số và 1 chữ hoa. Độ dài từ 6 đến 10 kí tự.');

    // hiển thị phần search_history khi click vào search_input
    $('body').on('click',function () {
        $('.header__search-text .header__search-text-warp .header__search-history').slideUp(100);
    })
    //set data in localStorage
     //update thông tin ở ô search vào search history
    $('.row.header__operate>.header__search .header__search-text input').on({'input': function () {
        $('.header__search-text .header__search-text-warp .header__search-history').slideDown(100)},
        'change': function () {
            $('.header__search-text-warp .header__search-history ul').html('');
            
            if(typeof (Storage)!== undefined && $(this).val().trim() !== ''){
                temp++;
                localStorage.setItem(temp,  $(this).val());
                for( let i=localStorage.length-item_display_num+1; i<=localStorage.length; i++){
                    if(i>0){
                        var value_storage = localStorage.getItem(i);
                        $('.header__search-text-warp .header__search-history ul').prepend(`<li><a href="">${value_storage}</a></li>`)
                    }
                    else{
                        return false;
                    }
                }
            }
            
            else{
                alert('trình duyệt bạn k hỗ trợ storage hoặc bạn không nhập giá trị vào ô search')
            }
        }}
    )
    // $('.row.header__operate>.header__cart .header__cart-wrap svg').on('click', function() {
    //     $('.row.header__operate>.header__cart .header__cart-list').toggle();
    // })
   
       //tạo slider async bằng thư viện slick 
        $('.slider-for').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.slider-nav,.slider-x',
            lazyLoad: 'ondemand'
          })
          $('.slider-nav').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            asNavFor: '.slider-for',
            dots: false,
            centerMode: true,
            focusOnSelect: true,
            arrows: false,
            lazyLoad: 'ondemand'
          })
          $('.slider-x').slick({
            slidesToShow: 7,
            slidesToScroll: 7,
            asNavFor: '.slider-for,.slider-nav',
            centerMode: true,
            focusOnSelect: true,
            arrows: false,
           
          })

          //Lấy thông tin tỉnh, huyện, xã, phường từ file json
          jQuery.ajax({
              url: "../data/place-data/tinh_tp.json",
              type: "get",
              dataType: "json",
              success: function (provinces){
                  for(var province in provinces ){
                    content  = content + `<option value=${provinces[province].code.trim()}>${provinces[province].name.trim()}</option>`;
                  }
                  provinces_transport.html(content)
              },
              error: function (err){
                  console.log(err)
              }
          })
          jQuery('#provinces').on('change', function(){
            var province_code = jQuery(this).val();
            // console.log(province_code)
            if(province_code.trim()!=''){
                jQuery.ajax({
                    url:'../data/place-data/quan_huyen.json',
                    type: "get",
                    dataType: "json",
                    success: function(districts) {
                       let districts_btn = '';
                       for(district in districts){
                        //    console.log(district.parent_code,province_code)
                           if(districts[district].parent_code == province_code){
                            districts_btn += `<option value =${districts[district].code}>${districts[district].name_with_type.trim()}</option>`
                           }
                       }
                    //    console.log(districts_btn)
                       $('#districts').html(districts_btn)
                    },
                    error: function(err){
                        console.log(err)
                    }
                })
            }

          })
          jQuery('#districts').on('change', function () {
              var district_code = jQuery(this).val();
            //   console.log(district_code)
            if(district_code.trim()!=''){
                jQuery.ajax({
                    url: '../data/place-data/xa_phuong.json',
                    type: "get",
                    dataType: "json",
                    success: function(villages){
                        let village_btn = '';
                        for(village in villages){
                            if(villages[village].parent_code == district_code){
                                village_btn +=`<option value =${villages[village].code}>${villages[village].name_with_type.trim()}</option>`
                            }
                        }
                        $('#villages').html(village_btn)
                    },
                    error: function(err){
                        console.log(err)
                    }
                })
            }
          })
          /*tạo hiệu ứng button-rippleEffect cho button add-to-cart và buy-now */
        
          /*event button addition, subtraction */
          var increase_bnt = $('.increase-bnt');
          var decrease_bnt = $('.decrease-bnt');
          var product_amount = parseInt($('#product_amount').val());
        //   console.log(product_amount)
          var stringAmount = $('.subsidiary-info__amount--content span').html();
          console.log(stringAmount)
          /*lấy dữ dữ liệu còn bao nhiêu sản phẩm và so sánh vs số lượng sản phẩm muốn mua */
          var temp = new RegExp(/\s[0-9].*?\s/g);
          var stringAmoutRegex = parseInt((stringAmount).match(temp).join());
        //   console.log(stringAmoutRegex)

          increase_bnt.on('click', function() {
              if(product_amount< stringAmoutRegex){

                  product_amount+=1;
                  $('#product_amount').val(product_amount);
              }
              else return
          })


          decrease_bnt.on('click', function() {
            if(product_amount>1){

                product_amount-=1;
                $('#product_amount').val(product_amount);
            }
            else return
        })
        //event khi click vào nút header__search--mobile
        var temps = 0;
        $('.header-search__mobile').on('click', function () {
            temps++;
            if(temps%2 == 1)
            $('.header__search.col-md-7.col-xl-8.col-lg-8').addClass('header__search--active')
            else
            $('.header__search.col-md-7.col-xl-8.col-lg-8').removeClass('header__search--active')
        })
        /*chặn event của thẻ a cạnh logo rẻ vô địch */
        $('.product_content__sale-off--content h3 a').on('click', function(e){
            e.preventDefault();
        })
    })

   