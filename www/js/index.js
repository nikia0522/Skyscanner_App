var yerin = {

    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        yerin.member.onCreate();
    },
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
/*        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');*/
        console.log('Received Event: ' + id);
    }
};

yerin.member=(function () {
    var onCreate = function () {
        setContentView();
        $('#loginBtn').click(e=>{
            e.preventDefault();
            yerin.login.onCreate();
        });
    };
    var setContentView = function () {
        $('body').empty();
        $('body').html(yerin.compUI.div('wrapper'));
        $('#wrapper').html(yerin.compUI.div('container'))
            .css({
                'width':'100%',
                'height':'100%',
                'background-color':'#00afcb'
            });
        $('#container').html(yerin.compUI.div('icon-box'))
            .css({
                'font-size':'30px',
                'color':'white'
            });
        $('#icon-box').append(yerin.compUI.i('fa fa-arrow-left'))
            .css({
                "padding-left": "20px",
                "padding-top":"10px"
            });
        $('#container').append(yerin.compUI.div('content'));
        $('#content')
            .css({
                'width':'100%',
                'height':'90%',
                'position':'absolute',
                'bottom':'0px'
            });
        $('#content').append(yerin.compUI.div('loginTxtDiv'));
        $('#loginTxtDiv')
            .css({
                'width':'100%',
                'text-align':'center',
                'color':'white',
                'margin-top':'50px',
                'margin-bottom':'50px'
            });
        $('#loginTxtDiv').html(yerin.compUI.span('loginTxt1'));
        $('#loginTxt1').text('등록 또는 로그인')
            .css({
                'font-size':'23px'
            });
        $('#loginTxt1').append(yerin.compUI.br());
        $('#loginTxtDiv').append(yerin.compUI.span('loginTxt2'));
        $('#loginTxt2').text('모든 장치와 동기화할 수 있습니다.')
            .css({
                'font-size':'18px'
            });
        $('#content').append(yerin.compUI.div('joinDiv'));
        $('#joinDiv')
            .css({
                'text-align':'center',
                'margin-bottom':'70px'
            });
        $('#joinDiv').append(yerin.compUI.image('apis', 'https://engineering.naukri.com/wp-content/uploads/sites/19/2015/11/Login-via-fb-or-google.png'));
        $('#apis').css({
            'margin': '0 auto'
        });
        $('#joinDiv').append(yerin.compUI.br());
        $('#joinDiv').append(yerin.compUI.span('emailJoin'));
        $('#emailJoin').text('이메일로 가입')
            .css({
                'font-size':'18px'
            });
        $('#content').append(yerin.compUI.div('loginDiv'));
        $('#loginDiv').append(yerin.compUI.span('loginText'))
            .css({
                'text-align':'center'
            });
        $('#loginText').text('이미 계정이 있으신가요? ')
            .css({
                'font-size':'18px'
            });
        $('#loginDiv').append(yerin.compUI.span('loginBtn'));
        $('#loginBtn').text('로그인')
            .css({
                'font-size':'19px'
            });
        $('#loginDiv').append(yerin.compUI.hr());
        $('#loginDiv').append(yerin.compUI.span('agreement'));
        $('#agreement').text('가입함으로써 이용 약관 및 개인정보처리방침에 동의합니다.')
            .css({
                'font-size':'13px'
            });
    };
    return {onCreate : onCreate, setContentView : setContentView};
})();

yerin.login=(function () {
    var onCreate = function () {
        setContentView();
        $('#closeBtn').click(e=>{
            e.preventDefault();
            alert('클릭됨');
            $('body').empty();
            yerin.member.onCreate();
        });
        $('#id').click(e=>{
            e.preventDefault();
            $('#id').removeAttr('placeholder');
        });
        $('#pass').click(e=>{
            e.preventDefault();
            $('#pass').removeAttr('placeholder');
        });
        $('#confirmBtn').click(e=>{
            var id = $('#id').val();
            var pass = $('#pass').val();
            console.log('입력된 id, pass:' + id+','+pass);
            $.ajax({
                async : false,
                url : 'json/member.json',
                type : 'post',
                data : {id:id, pass:pass},
                datatype: 'json',
                success : d =>{
                    $.each(d,(i,o)=>{
                        if(o.id === id && o.pass === pass){
                            checkval = true;
                            return false;
                        }else {
                            checkval = false;
                        }
                    });
                    if(checkval == true){
                        alert('Success');
                        yerin.main.onCreate();
                    }else{
                        alert('Fail');
                        $('#id').val('');
                        $('#pass').val('');
                        yerin.main.onCreate();
                    }
                },
                error : e=>{
                    alert('error');
                }
            });
        });
    };
    var setContentView = function () {
        $('#container').empty();
        $('#container')
            .css({
                'font-size':'30px'
            });
        $('#container').html(yerin.compUI.div('icon-box'));
        $('#icon-box')
            .css({
                "padding-left": "20px",
                "padding-top":"10px"
            })
            .append(yerin.compUI.div('closeBtn'));
        $('#closeBtn').append(yerin.compUI.i('fa fa-close'));
        $('#closeBtn').css({
            'color' : 'white'
        });
        $('#closeBtn').append(yerin.compUI.span('loginTxt'));
        $('#loginTxt').text(' 로그인')
            .css({
                "font-size":'25px'
            });
        $('#container').append(yerin.compUI.div('content'));
        $('#content')
            .css({
                'width':'100%',
                'height':'90%',
                'position':'absolute',
                'bottom':'0px',
                'background-color':'white',
                'text-align':'center'
            });
        $('#content').append(yerin.compUI.div('image-box'));
        $('#image-box')
            .css({
                'margin-top':'30px',
                'margin-bottom':'30px'
            });
        $('#image-box').append(yerin.compUI.image('logo','https://upload.wikimedia.org/wikipedia/commons/7/76/Skyscanner_Logo_New.png'));
        $('#logo')
            .css({
                'width':'200px',
                'height':'50px'
            });
        $('#content').append(yerin.compUI.div('loginDiv'));
        $('#loginDiv').append(yerin.compUI.input('id','text'));
        $('#id').attr({
            'placeholder':'이메일',
            'value':'hong'
        })
            .css({
                'width':'90%','font-size':'20px', 'color':'black','margin-bottom':'50px',
                'border-top-style': 'hidden',
                'border-right-style': 'hidden',
                'border-left-style': 'hidden',
                'border-bottom-style': '2px solid black'
            });
        $('#loginDiv').append(yerin.compUI.input('pass','text'));
        $('#pass').attr({
            'placeholder':'비밀번호',
            'value':'1'
        })
            .css({
                'width':'90%','font-size':'20px', 'color':'black', 'margin-bottom':'100px',
                'border-top-style': 'hidden',
                'border-right-style': 'hidden',
                'border-left-style': 'hidden',
                'border-bottom-style': '2px solid black'
            });
        $('#content').append(yerin.compUI.div('loginFoot'));
        $('#loginFoot')
            .css({
                'width':'100%',
                'position':'absolute',
                'bottom':'40px'
            });
        $('#loginFoot').append(yerin.compUI.hr());
        $('#loginFoot').append(yerin.compUI.span('forgotPass'));
        $('#forgotPass').text('비밀번호를 잊으셨나요?')
            .css({
                'position':'absolute',
                'left':'20px',
                'color':'black',
                'font-size':'15px'
            });
        $('#loginFoot').append(yerin.compUI.span('confirmBtn'));
        $('#confirmBtn').text('로그인')
            .css({
                'position':'absolute',
                'right':'20px',
                'color':'#00afcb',
                'font-size':'15px'
            });

    };
    return {onCreate : onCreate};
})();

yerin.main=(function () {
    var onCreate=function () {
        setContentView();
        $('#backBtn').click(e=>{
           e.preventDefault();
           yerin.login.onCreate();
        });
        $('#searchBtn').click(e=>{
            e.preventDefault();
            yerin.searchResult.onCreate();
        });
        $('#viewDepartAirport').click(e=>{
            e.preventDefault();
            yerin.modalPopup.onCreate();
        });
        $('#viewArriveAirport').click(e=>{
            e.preventDefault();
            yerin.modalPopup.onCreate();
        });
        $('#viewCal').click(e=>{
            e.preventDefault();
            yerin.calPopup.onCreate();
        });

    };
    var setContentView=function () {
        $('#container').empty();
        $('#container').html(yerin.compUI.div('icon-box'))
            .css({
                'font-size':'30px',
                'color':'white'
            });
        $('#icon-box').append(yerin.compUI.div('backBtn'));
        $('#backBtn').append(yerin.compUI.i('fa fa-arrow-left'))
            .css({
                "padding-left": "20px",
                "padding-top":"10px"
            });
        $('#container').append(yerin.compUI.div('content'));
        $('#content')
            .css({
                'width':'100%',
                'height':'90%',
                'position':'absolute',
                'bottom':'0px'
            });
        $('#content')
            .css({
                'background-color':'white',
                'text-align':'center'
            });
        $('#content').append(yerin.compUI.div('selectBtns'));
        $('#selectBtns')
            .css({
                'color':'black',
                'padding' : '10px'
            });
        $('#selectBtns').append(yerin.compUI.span('departCity'));
        $('#departCity').text('출발지')
            .css({
                'font-size':'20px',
                'color':'#737578'
            });
        $('#departCity').append(yerin.compUI.br());
        $('#selectBtns').append(yerin.selectOption.depart());
        $('#selectBox1').change(()=>{
                if ($("#selectBox1 option:selected").val() === 'seoul') {
                    $('#selectBox2')
                        .html("<option value='airport1'>서울, 인천국제공항(ICN)</option><option value='airport2'>서울, 김포국제공항(GMP)</option>");
                } else if ($("#selectBox1 option:selected").val() === 'london') {
                    $('#selectBox2')
                        .html("<option value='airport1'>런던, 히드로국제공항(LHR)</option><option value='airport2'>런던, 개트윅국제공항(LGW)</option>");
                } else if ($("#selectBox1 option:selected").val() === 'tokyo') {
                    $('#selectBox2')
                        .html("<option value='airport1'>도쿄, 나리타국제공항(NRT)</option><option value='airport2'>도쿄, 하네다국제공항(HND)</option>");
                } else if ($("#selectBox1 option:selected").val() === 'paris') {
                    $('#selectBox2')
                        .html("<option value='airport1'>파리, 샤를드골국제공항(CDG)</option><option value='airport2'>파리, 오를리국제공항(ORY)</option>");
                }
        });
        $('#selectBtns').append(yerin.compUI.br());
        $('#selectBtns').append(yerin.compUI.btn('viewDepartAirport'));
        $('#viewDepartAirport').text('주변 공항 보기')
            .css({
                'background-color':'#00afcb',
                'color':'white',
                'font-size':'15px',
                'border': 'none',
                'border-radius': '4px',
                'height': '35px',
                'margin-left': '187px'
            });
        $('#selectBtns').append(yerin.compUI.br());
        $('#selectBtns').append(yerin.compUI.span('arriveCity'));
        $('#arriveCity').text('도착지')
            .css({
                'font-size':'20px',
                'color':'#737578'
            });
        $('#arriveCity').append(yerin.compUI.br());
        $('#selectBtns').append(yerin.selectOption.arrive());
        $('#selectBox3').change(()=>{
            if ($("#selectBox3 option:selected").val() === 'seoul') {
                $('#selectBox4')
                    .html("<option value='airport1'>서울, 인천국제공항(ICN)</option><option value='airport2'>서울, 김포국제공항(GMP)</option>");
            } else if ($("#selectBox3 option:selected").val() === 'london') {
                $('#selectBox4')
                    .html("<option value='airport1'>런던, 히드로국제공항(LHR)</option><option value='airport2'>런던, 개트윅국제공항(LGW)</option>");
            } else if ($("#selectBox3 option:selected").val() === 'tokyo') {
                $('#selectBox4')
                    .html("<option value='airport1'>도쿄, 나리타국제공항(NRT)</option><option value='airport2'>도쿄, 하네다국제공항(HND)</option>");
            } else if ($("#selectBox3 option:selected").val() === 'paris') {
                $('#selectBox4')
                    .html("<option value='airport1'>파리, 샤를드골국제공항(CDG)</option><option value='airport2'>파리, 오를리국제공항(ORY)</option>");
            }
        });
        $('#selectBtns').append(yerin.compUI.br());
        $('#selectBtns').append(yerin.compUI.btn('viewArriveAirport'));
        $('#viewArriveAirport').text('주변 공항 보기')
            .css({
                'background-color':'#00afcb',
                'color':'white',
                'font-size':'15px',
                'border': 'none',
                'border-radius': '4px',
                'height': '35px',
                'margin-left': '187px'
            });
        $('#selectBtns').append(yerin.compUI.br());
        $('#selectBtns').append(yerin.compUI.div('selectDate'));
        $('#selectDate').append(yerin.compUI.div('calendar'));1
        $('#calendar').append(yerin.compUI.span('calText'));
        $('#calText').text('기간 선택')
            .css({
                'font-size':'20px',
                'color':'#737578'
            });
        $('#calText').append(yerin.compUI.br());
        $('#calendar').append(yerin.compUI.input('startDt', 'text'));
        $('#startDt').attr('placeholder', '출발일')
            .css({
                'width' : '150px',
                'font-size' : '20px'
            });
        $('#startDt').datepicker({
            dateFormat: "yy-mm-dd",
            dayNamesMin: [ "일", "월", "화", "수", "목", "금", "토" ],
            monthNames: [ "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월" ],
            monthNamesShort: [ "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월" ],
            defaultDate: "+1w",
            numberOfMonths: 1,
            changeMonth: true,
            showMonthAfterYear: true ,
            changeYear: true,
            onClose: function( selectedDate ) {
                $( "#endDt" ).datepicker( "option", "minDate", selectedDate );
            }
        });
        $("#startDt").datepicker({
            dateFormat: "yy-mm-dd",
            defaultDate: "+1w",
            numberOfMonths: 1,
            changeMonth: true,
            showMonthAfterYear: true ,
            changeYear: true,
            onClose: function( selectedDate ) {
                if ($( "#endDt" ).val() < selectedDate)
                {
                    $( "#endDt" ).val(selectedDate);
                }
            }
        });
        $('#calendar').append(yerin.compUI.input('endDt', 'text'));
        $('#endDt').attr('placeholder', '도착일')
            .css({
                'width' : '150px',
                'font-size' : '20px'
            });
        $("#endDt").datepicker({
            dateFormat: "yy-mm-dd",
            dayNamesMin: [ "일", "월", "화", "수", "목", "금", "토" ],
            monthNames: [ "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월" ],
            monthNamesShort: [ "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월" ],
            defaultDate: "+1w",
            numberOfMonths: 1,
            changeMonth: true,
            showMonthAfterYear: true ,
            changeYear: true,
            onClose: function( selectedDate ) {
                $( "#startDt" ).datepicker( "option", "maxDate", selectedDate );
            }
        });
        $( "#endDt" ).datepicker({
            dateFormat: "yy-mm-dd",
            defaultDate: "+1w",
            numberOfMonths: 1,
            changeMonth: true,
            showMonthAfterYear: true ,
            changeYear: true,
            onClose: function( selectedDate ) {
                if ($("#startDt" ).val() > selectedDate)
                {
                    $("#startDt" ).val(selectedDate);
                }
            }
        });
        $('#content').append(yerin.compUI.btn('searchBtn'));
        $('#searchBtn').text('검색')
            .css({
                'background-color':'#00afcb',
                'color':'white',
                'border': 'none',
                'border-radius': '4px',
                'height': '45px',
                'margin-left': '187px'
            });
    };
    return {onCreate : onCreate, setContentView : setContentView};
})();
yerin.selectOption={
    depart : ()=>{
        return       '<span class="us-form-select-wrap" style="width: 70%; font-size: 20px">'
        +'    <select id="selectBox1">'
                +'    <option value="seoul" >서울</option>'
                +'    <option value="london" >런던</option>'
                +'    <option value="tokyo" >도쿄</option>'
                +'    <option value="paris" >파리</option> '
            +'</select>'
        +'</span>'
        +'<span class="us-form-select-wrap" style="width: 70%; font-size: 20px">'
            +'    <select id="selectBox2" style="width: 230px">'
            +'    <option value="airport1">서울, 인천국제공항(ICN)</option>'
            +'    <option value="airport2">서울, 김포국제공항(GMP)</option>'
            +'</select>'
            +'</span>'
    },
    arrive : ()=>{
        return       '<span class="us-form-select-wrap" style="width: 70%; font-size: 20px">'
            +'    <select id="selectBox3">'
            +'    <option value="seoul" >서울</option>'
            +'    <option value="london" >런던</option>'
            +'    <option value="tokyo" >도쿄</option>'
            +'    <option value="paris">파리</option> '
            +'</select>'
            +'</span>'
            +'<span class="us-form-select-wrap" style="width: 70%; font-size: 20px">'
            +'    <select id="selectBox4" style="width: 230px">'
            +'    <option value="airport1">서울, 인천국제공항(ICN)</option>'
            +'    <option value="airport2">서울, 김포국제공항(GMP)</option>'
            +'</select>'
            +'</span>'
    }
};

yerin.modalPopup=(function () {
    var onCreate = function () {
        setContentView();
        $('#closeIcon').click(e=>{
            e.preventDefault();
            $('#wrapper').empty();
            $('#wrapper').css({
                'background-color':'#00afcb'
            });
            $('#wrapper').append(yerin.compUI.div('container'));
            $('#container').empty();
            /*yerin.member.setContentView();*/
            yerin.main.onCreate();
        });
    };
    var setContentView = function () {
        $('#modalPopup').empty();
        $('#wrapper').addClass('layer-dark');
        $('#wrapper').css({
            'position': 'relative',
            'width' : '100%',
            'height' : '100%',
            'margin' : '0 auto',
            'background-color' : '#dadcdf'
        });
        $('#wrapper').append(yerin.compUI.div('modalPopup'));
        $('#modalPopup')
            .css({
                'width' : '90%',
                'height' : '90%',
                'position' : 'absolute',
                'top' : '20px',
                'left' : '17px',
                'margin' : '0 auto',
                'border' : '1px solid #00c6e5',
                'background-color' : '#00c6e5',
                'border-radius': '4px'

            });
        $('#modalPopup').append(yerin.compUI.div('popupContent'));
        $('#popupContent').append(yerin.compUI.span('header'));
        $('#header').append(yerin.compUI.span('headerText'));
        $('#headerText').text('서울 근처 공항 보기')
            .css({
                'position' : 'absolute',
                'left' : '10px',
                'top' : '5px',
                'font-size': '25px',
                'color' : 'white'

            });
        $('#header').append(yerin.compUI.span('closeIcon'));
        $('#closeIcon').text('X')
            .css({
                'position' : 'absolute',
                "right": "10px",
                "top ":"5px",
                'font-size':'30px',
                'color':'white'
            });
        $('#popupContent').append(yerin.compUI.span('modalContent'));
        $('#modalContent').append(yerin.compUI.div('images'));
        $('#images').append(yerin.compUI.span('image1'));
        $('#image1').css({
            'position': 'absolute',
            'top' : '70px',
            'left' : '7px',
            'width' : '45%',
            'height' : '70px',
            'background-color' : 'white',
            'border' : '1px solid white'
        });
        $('#image1').append(yerin.compUI.image('airport1',''));
        $('#images').append(yerin.compUI.span('image2'));
        $('#image2').css({
            'position': 'absolute',
            'top' : '70px',
            'right' : '7px',
            'width' : '45%',
            'height' : '70px',
            'background-color' : 'white',
            'border' : '1px solid white'
        });
        $('#image2').append(yerin.compUI.image('airport2',''));
        $('#modalContent').append(yerin.compUI.div('googleMap'));
        $('#googleMap').append(yerin.compUI.span('googleText'))
            .css({
                'position': 'absolute',
                'top' : '150px',
                'left' : '7px',
                'width' : '95%',
                'height' : '300px',
                'margin' : '0 auto',
                'background-color' : 'pink',
                'border' : '1px solid pink'
            });
        $('#googleText').text('구글맵이 들어갈 자리임');
    };
    return {onCreate : onCreate, setContentView : setContentView};
})();

yerin.searchResult=(function () {
    var onCreate=function () {
        setContentView();
        $('#backMainBtn').click(e=>{
            e.preventDefault();
            yerin.main.onCreate();
        });
        $('#payBtn').click(e=>{
            e.preventDefault();
            yerin.pay.onCreate();
        });
        $('#cancelBtn').click(e=>{
            e.preventDefault();
            yerin.main.onCreate();
        });
    };
    var setContentView=function () {
        $('#container').empty();
        $('#container').html(yerin.compUI.div('icon-box'))
            .css({
                'font-size':'30px',
                'color':'white',
            });
        $('#icon-box').append(yerin.compUI.div('backMainBtn'));
        $('#backMainBtn').append(yerin.compUI.i('fa fa-arrow-left'))
            .css({
                "padding-left": "20px",
                "padding-top":"10px"
            });
        $('#icon-box').append(yerin.compUI.span('departCity'));
        $('#departCity').text(' 출발지 - ')
            .css({
                "font-size":'15px',
                'padding-left':'10px'
            });
        $('#icon-box').append(yerin.compUI.span('arriveCity'));
        $('#arriveCity').text(' 도착지')
            .css({
                "font-size":'15px'
            });
/*        $('#icon-box').append(yerin.compUI.span('date'));
        $('#date').css({"font-size":'15px'}).text('  ');*/
        $('#icon-box').append(yerin.compUI.span('date'));
        $('#date').text(' 날짜~~~')
            .css({
                "font-size":'15px',
                'padding-left':'30px'
            });
        $('#container').append(yerin.compUI.div('content'));
        $('#content')
            .css({
                'width':'100%',
                'height':'90%',
                'position':'absolute',
                'bottom':'0px'
            });
        $('#content')
            .css({
                'background-color':'white',
                'color':'black'
            });
        $('#content').append(yerin.compUI.div('resultList'));
        $('#resultList')
            .css({
                'background-color':'#dadee5',
                'width':'100%',
                'height':'100%',
                'position':'absolute',
                'bottom':'0px'
            });
        $('#resultList').append(yerin.compUI.div('listBlock'));
        $('#listBlock').css({
            'width': '95%',
            'height': '95%',
            'margin-top': '9px',
            'margin-left': '9px',
            'background-color': 'white',
            'border': '1px solid white'
        });
        $('#listBlock').append(yerin.compUI.div('flight-list'));
        $('#flight-list').css({
            'width' : '95%',
            'height' : '90px',
            'margin-top' : '9px',
            'margin-left': '9px',
            'background-color' : '#dadee5',
            'border' : '1px solid #dadee5'
        });
        $('#listBlock').append(yerin.compUI.btn('payBtn'));
        $('#payBtn').text('결제')
            .css({
                'position' : 'absolute',
                'bottom' : '50px',
                'right' : '40px',
                'color' : 'white',
                'background-color' : '#00afcb',
                'border': 'none',
                'border-radius': '4px',
                'width' : '100px',
                'height': '45px'
            });
        $('#listBlock').append(yerin.compUI.btn('cancelBtn'));
        $('#cancelBtn').text('취소')
            .css({
                'position' : 'absolute',
                'bottom' : '50px',
                'left' : '40px',
                'color' : 'white',
                'background-color' : '#e8463d',
                'border': 'none',
                'border-radius': '4px',
                'width' : '100px',
                'height': '45px'
            });
    };
    return {onCreate : onCreate};
})();
yerin.pay=(function () {
    var onCreate = function () {
        setContentView();
        $('#confirmPayBtn').click(e=>{
            if(yerin.valid.emialChecker($('#writePayEmail').val())==='yes'){
                if(yerin.valid.cardNumberChecker($('#writeCardDetail').val()*1)){
                    yerin.final.onCreate();
                }else{
                    alert('숫자만 입력 가능');
                    $('#writeCardDetail').val('');
                }
            }else{
                alert('이메일 주소를 확인해주세요.');
                $('#writePayEmail').val('');
            }
            e.preventDefault();
        });
    };
    var setContentView = function () {
        $('#content').empty();
        $('#content').css({
           'background-color':'#dadcdf'
        });
        $('#content').append(yerin.compUI.div('pay'));
        $('#pay').css({
            'position' : 'absolute',
            'top' : '13px',
            'left' : '9px',
            'width' : '95%',
            'height' : '95%',
            'background-color' :'white',
            'border-radius': '4px'
        });
        $('#pay').append(yerin.compUI.div('payHeader'));
        $('#payHeader').css({
                'position':'absolute',
                'width':'100%',
                'height':'40px',
                'text-align':'center',
                'background-color' : '#9900cc',
                'color' : 'white',
                'border-radius': '4px'
            });
        $('#payHeader').append(yerin.compUI.span('payTitle'));
        $('#payTitle').text('이메일 + 카드번호')
            .css({
               'font-size':'15px'
            });
        $('#pay').append(yerin.compUI.div('payDetail'));
        $('#payDetail').append(yerin.compUI.span('payEmail'));
        $('#payEmail').text('이메일')
            .css({
                'position' : 'absolute',
                'top' : '70px',
                'left' : '10px',
                'font-size' : '15px'
            });
        $('#payDetail').append(yerin.compUI.input('writePayEmail','text'));
        $('#writePayEmail')
            .attr({
                'placeholder' : 'abc@abc.com'
            })
            .css({
            'position' : 'absolute',
            'top' : '70px',
            'right' : '10px',
            'width' :'70%',
            'height' : '35px'
        });
        $('#payDetail').append(yerin.compUI.span('payCardDetail'));
        $('#payCardDetail').text('카드번호')
            .css({
                'position' : 'absolute',
                'top' : '140px',
                'left' : '10px',
                'font-size' : '15px'
            });
        $('#payDetail').append(yerin.compUI.input('writeCardDetail', 'text'));
        $('#writeCardDetail')
            .attr({
                'placeholder' : '16자리 카드 번호'
            })
            .css({
            'position' : 'absolute',
            'top' : '140px',
            'right' : '10px',
            'width' :'70%',
            'height' : '35px'
        });
        $('#pay').append(yerin.compUI.btn('confirmPayBtn'));
        $('#confirmPayBtn').text('확인')
            .css({
                'position': 'absolute',
                'top': '200px',
                'right': '30px',
                'width': '70px',
                'margin' : '0 auto',
                'background-color' : '#9900cc',
                'color' : 'white',
                'font-size' : '15px',
                'border': 'none',
                'border-radius': '4px',
                'height': '35px'
        });
        $('#pay').append(yerin.compUI.div('payNotice'));
        $('#payNotice').css({
            'position' : 'absolute',
            'top' : '250px',
            'right': '5px',
            'width' : '97%',
            'height' : '290px',
            'border' : '1px solid #dadcdf'
        });
        $('#payNotice').append('<p style="color: #9900cc; font-weight: bold;">※ 입력 팁! 알아두면 편리합니다.</p>'
            +'<hr/>'
            +'<p style="font-weight: bold;">"이메일"</p>'
            +'<p >결제 요청 시 자동(입력) 또는 직접 입력한 이메일 정보를 정확히 입력<br/>'
            +'도메인을 포함한 전체 e-mail 주소를 입력<br/>'
            +'>가령 "abc@abc.com" 주소의 경우, "abc"만 입력하는 경우는 올바르지 않습니다.<br/></p>'
            +'<p style="font-weight: bold; ">"카드번호"</p>'
            +'<p >결제할 카드번호 16자리를 입력<br/></p>'
        )
            .css({
                'font-size':'14px',
                'padding': '4px',
                'color':'#737578'
            });
    };
    return {onCreate : onCreate};
})();
yerin.valid = {
    emialChecker : x => {
        var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        return regExp.test(x)? "yes" : "no";
    },
    cardNumberChecker : x=> {
        return typeof x === 'number' && isFinite(x);
    }
};
yerin.final=(function () {
    var onCreate= function () {
        setContentView();
    };
    var setContentView = function () {
        $('#content').empty();
        $('#content').css({
            'background-color':'white',
            'padding-top': '40px'
        });
        $('#content').append(yerin.compUI.div('finalText'));
        $('#finalText').text('결제 완료')
            .css({
                'font-size' : '30px',
                'text-align' : 'center',
                'color' : '#737578'
            });
        $('#finalText').append(yerin.compUI.div('finalDetail'));
        $('#finalDetail').text('디테일 뿌리기')
            .css({
                'padding-top' : '40px'
            });
    };
    return {onCreate : onCreate};
})();

yerin.cookie={
    setCoockie:(k,v)=>{
        document.cookie = k+"=" +v;
    },
    getCookie:k=>{
        var x = k+ "=";
        var i = 0;
        var arr= document.cookie.split(';');
        for(i=0;i<arr.length;i++){
            var j = arr[i];
            while(j.charAt(0)==''){
                j=j.substring(1,j.length)
            }
            if(j.indexOf(x)==0){
                return j.substring(x.length,j.length);
            }
            return null;
        }

    },
    removeCookie: k=>{

    }
};
yerin.compUI = {
    br    :()=>{return $('<br/>');},
    hr : ()=>{return $('<hr>')},
    div   : x=>{return $('<div/>',{id:x});},
    h1    : x=>{return $('<h1/>',{id:x});},
    span  : x=>{return $('<span/>',{id:x});},
    iTxt  : x=>{return $('<input/>',{id:x,type:'text'});},
    aBtn  : x=>{return $('<a/>',{href:'#', role: 'button', id:x});},
    iBtn  : x=>{return $('<input/>',{id:x,type:'button'});},
    image : (x,y)=>{return $('<img/>',{id:x,src:y});},
    table : x=>{return $('<table/>',{id:x})},
    tr :()=>{return $('<tr/>')},
    td :()=>{return $('<td/>')},
    input : (x,y)=>{return $('<input/>',{id:x,type:y});},
    btn : x=>{return $('<button>',{id:x})},
    nav: x=>{return $('<nav/>',{id: x});},
    ul : (x,y)=>{return $('<ul/>',{id:x,class:y})},
    li : (x,y)=>{return $('<li/>',{id:x,class:y})},
    a : ()=>{return $('<a/>',{href:'#'})},
    i : x=>{return $('<i/>',{class:x})},
    b : x=>{return $('</b>', {class:x})}
};
$(function(){
    yerin.initialize();
});
yerin.initialize();