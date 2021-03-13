$(document).ready(function () {
    $('.container-fluid.loading').fadeOut(3000);
    // bắt đầu từ 0 đến 9 dấu - hoặc +, có từ 9 đến 15 số
    var regex_num = /^[0-9\-\+]{10,13}$/g;
    // là kí tự [0-9] hoặc [a-z] hoặc [A-Z] hoặc _
    var regex_userName = /^[\w]{4,10}$/g;
    // có 6 đến 10 kí tự, bao gồm ít nhất 2 số, 1 chữ hoa, không chứa kí tự đặc biệt.
    var regex_pass = /^(?=.*\d.*\d)(?=.*[A-Z])[\w]{6,10}$/g
    var temp =localStorage.length;
    console.log(temp);
    var item_display_num = 4;
    var space_pagination = 1;
    //hiển thị lịch sử tìm kiếm ở phần header__search
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
    //event khi click vào chữ "trang điểm"
        $('.category__item.category__item-active').on('click', function (e) {
            e.preventDefault();
            $('.category-content .category__list .category__item:gt(0)').toggle(100);
            $('.category-content .category__list .category__item .item-active__before').toggle(100);
            $('.category-content .category__list .category__item .item-active__after').toggle(100);
        })
        /*ngăn chặn hành vi mặc định của các nút trong phần trang điểm */
        $('.category__list li a').on('click', function (e){
            e.preventDefault();
        })
        //ngăn chặn hành vị mặc định ở phần sort-link trong tablet và mobile
        $('.header__sort-link').on('click', function (e) {
            e.preventDefault();
        })
        //ngăn chặn hành vi mặc định ở phần thẻ a trong footer của page
        $('.footer-list a').on('click', function (e) {
            e.preventDefault();
        })
        $('.footer__apps a').on('click', function (e) {
            e.preventDefault();
        })
    //event khi click vào các button trong phần home-filter
        $('.home-filter__btn').on('click', function() {
            $('.home-filter__btn.active').removeClass('active');
            $(this).addClass('active');
        })

    //event khi click vào trái tim
    $('.home-product__item-action--unlike').on('click', function () {
        $(this).toggle();
        $(this).parent().find('.home-product__item-action--liked').toggle();
    })
    $('.home-product__item-action--liked').on('click', function () {
        $(this).toggle();
        $(this).parent().find('.home-product__item-action--unlike').toggle();
    })

    //event khi click vào sao
    $('.home-product__item-action--rating svg').on('click', function () {
        var temp =parseInt($(this).attr('value'));
        totalLength =$(this).parents('.home-product__item-action--rating').children().length;
        for(i=0; i<totalLength; i++){
            if(i<= temp){

                var child = $(this).parents('.home-product__item-action--rating').children()[i];
                $(child).children().css('color', '#fe6433');
            }
            else{
                var child = $(this).parents('.home-product__item-action--rating').children()[i];
                $(child).children().css('color', '#a79a9a');
            }
        }
    })

    //event khi click vào pagination
    $('.pagination-item__link').on('click', function (e) {
        e.preventDefault();
        if($(this).text()!==$('.pagination-item__link.pagination-item__link--dots').text()){
            $('.pagination-item__link.pagination-item__link--active').removeClass('pagination-item__link--active');
            $(this).addClass('pagination-item__link--active');
        }
    })
    // event khi click vào nút pre ở pagination
    $('.pagination-item__link--left').on('click', function () {
        
        if($('.pagination-item__link--number:first').html() !== '1'){
            $('.pagination-item__link--totalPage').css('display','block');
            $('.pagination-item__link--dots').css('display','block');
            // $('.pagination-item__link--right').css('display','block');
            $('.pagination-item__link--number').each((index, value)=> {
                $(value).text(parseInt( $(value).text()) - space_pagination);
            });
        }
    })
    // event khi click vào nút next ở pagination
    $('.pagination-item__link--right').on('click', function () {
        
        if(parseInt($('.pagination-item__link--number:last').text()) <= (parseInt($('.pagination-item__link--totalPage').text())-space_pagination)){
            // $('.pagination-item__link--totalPage').css('display','block');
            // $('.pagination-item__link--dots').css('display','block');
            // $('.pagination-item__link--right').css('display','block');
            $('.pagination-item__link--number').each((index, value)=> {
                $(value).text(parseInt( $(value).text()) + space_pagination);
                
            });
            if (parseInt($('.pagination-item__link--number:last').text()) >= (parseInt($('.pagination-item__link--totalPage').text()))) {
                
            $('.pagination-item__link--totalPage').css('display','none');
            $('.pagination-item__link--dots').css('display','none');
            }
           
        }
        // else{

        //     $('.pagination-item__link--totalPage').css('display','none');
        //     $('.pagination-item__link--dots').css('display','none');
        //     // $('.pagination-item__link--right').css('display','none');
        //     // $('.pagination-item__link--number').each((index, value)=> {
        //     //     $(value).text(parseInt( $(value).text()) + space_pagination);
        //     // $(this).off('click');   
        //     // });
        // }
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

})