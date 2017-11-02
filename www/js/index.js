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
        $('body').css({
          'background-color' : 'white'
        });
        $('body').html(yerin.compUI.div('wrapper'));
        $('#wrapper').html(yerin.compUI.div('container'))
            .css({
                'width':'100%',
                'height':'100%',
                'background-color':'#00afcb'
            });
        $('#container')
            .css({
                'font-size':'30px',
                'color':'white',
                'width':'100%',
                'height':'100%'
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
        $('#content').append(yerin.compUI.div('text-animation'));
        $('#text-animation').append('<p class="line-1 anim-typewriter" style="font-size: 15px; color: #e7efb8">Cheap Flights to Everywhere...</p>');
        $('#content').append(yerin.compUI.div('loginDiv'));
        $('#loginDiv').append(yerin.compUI.span('loginText'))
            .css({
                'text-align':'center',
                'margin-top' : '210px'
            });
        $('#loginText').text('이미 계정이 있으신가요? ')
            .css({
                'font-size':'18px'
            });
        $('#loginDiv').append(yerin.compUI.span('loginBtn'));
        $('#loginBtn').text('로그인')
            .css({
                'font-size':'19px',
                'color' : '#e7efb8'
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
            var email = $('#email').val();
            var pass = $('#pass').val();
            console.log('입력된 email, pass:' + email+','+pass);
            $.ajax({
                async : false,
                url : 'json/member.json',
                type : 'post',
                data : {email:email, pass:pass},
                datatype: 'json',
                success : d =>{
                    $.each(d,(i,o)=>{
                        if(o.email === email && o.pass === pass){
                            checkval = true;
                            return false;
                        }else {
                            checkval = false;
                        }
                    });
                    if(checkval == true){
                        alert('Success');
                        yerin.intro.onCreate();
                    }else{
                        alert('Fail');
                        $('#email').val('');
                        $('#pass').val('');
                        yerin.intro.onCreate();
                    }
                },
                error : e=>{
                    alert('error????');
                }
            });
        });
    };
    var setContentView = function () {
        $('#container').empty();
        $('#container')
            .css({
                'font-size':'30px',
                'width':'100%',
                'height':'100%'
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
        $('#loginDiv').append(yerin.compUI.input('email','text'));
        $('#email').attr({
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

yerin.intro= (function () {
    var onCreate = function () {
        setContentView();
        $('#searchFlights').click(e=>{
            e.preventDefault();
            yerin.main.onCreate();
        });
    };
    var setContentView = function () {
        $('#container').empty();
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
        $('#content').append(yerin.compUI.div('text-animation1'));
        $('#text-animation1').append('<p class="line-1 anim-typewriter" style="font-size: 15px; color: #1a0217; margin-top: 50px; font-weight: bold">Where do you want to go?</p>');
        $('#content').append(yerin.compUI.div('slideshow'));
        $('#slideshow').load('slideshow.html');
        $('#content').append(yerin.compUI.btn('searchFlights'));
        $('#searchFlights').text('SEARCH')
            .css({
                'background-color':'#01d0bf',
                'color':'white',
                'font-size':'25px',
                'border': 'none',
                'border-radius': '4px',
                'height': '45px',
                'margin-top': '120px'
            });
    };
    return {onCreate: onCreate}
})();

yerin.main=(function () {
    var onCreate=function () {
        setContentView();
        $('#menuBtn').click(e=>{
           e.preventDefault();
           yerin.menuBar.onCreate();
        });
        $('#searchBtn').click(e=>{
            e.preventDefault();
            if ($("#selectBox1 option:selected").val() === 'seoul') {
                yerin.session.init('city1', 'seoul');
                if ($("#selectBox2 option:selected").val() === 'ICN'){
                    yerin.session.init('depart', '서울/인천(ICN)');
                        if($("#selectBox3 option:selected").val() === 'KAL'){
                            yerin.session.init('depart_airline', '대한항공');
                        }else if($("#selectBox3 option:selected").val() === 'BA'){
                            yerin.session.init('depart_airline', '영국항공');
                        }else if($("#selectBox3 option:selected").val() === 'JAL'){
                            yerin.session.init('depart_airline', '일본항공');
                        }else if($("#selectBox3 option:selected").val() === 'FR'){
                            yerin.session.init('depart_airline', '에어프랑스');
                        }
                }else{
                    yerin.session.init('depart', '서울/김포(GMP)');
                    if($("#selectBox3 option:selected").val() === 'KAL'){
                        yerin.session.init('depart_airline', '대한항공');
                    }else if($("#selectBox3 option:selected").val() === 'BA'){
                        yerin.session.init('depart_airline', '영국항공');
                    }else if($("#selectBox3 option:selected").val() === 'JAL'){
                        yerin.session.init('depart_airline', '일본항공');
                    }else if($("#selectBox3 option:selected").val() === 'FR'){
                        yerin.session.init('depart_airline', '에어프랑스');
                    }
                }
            }else if($("#selectBox1 option:selected").val() === 'london'){
                yerin.session.init('city1', 'london');
                if ($("#selectBox2 option:selected").val() === 'LHW'){
                    yerin.session.init('depart', '런던/히드로(LHW)');
                    if($("#selectBox3 option:selected").val() === 'KAL'){
                        yerin.session.init('depart_airline', '대한항공');
                    }else if($("#selectBox3 option:selected").val() === 'BA'){
                        yerin.session.init('depart_airline', '영국항공');
                    }else if($("#selectBox3 option:selected").val() === 'JAL'){
                        yerin.session.init('depart_airline', '일본항공');
                    }else if($("#selectBox3 option:selected").val() === 'FR'){
                        yerin.session.init('depart_airline', '에어프랑스');
                    }
                }else{
                    yerin.session.init('depart', '런던/개트윅(LGW)');
                    if($("#selectBox3 option:selected").val() === 'KAL'){
                        yerin.session.init('depart_airline', '대한항공');
                    }else if($("#selectBox3 option:selected").val() === 'BA'){
                        yerin.session.init('depart_airline', '영국항공');
                    }else if($("#selectBox3 option:selected").val() === 'JAL'){
                        yerin.session.init('depart_airline', '일본항공');
                    }else if($("#selectBox3 option:selected").val() === 'FR'){
                        yerin.session.init('depart_airline', '에어프랑스');
                    }
                }
            }else if($('#selectBox1 option:selected').val() === 'tokyo'){
                yerin.session.init('city1', 'tokyo');
                if ($("#selectBox2 option:selected").val() === 'NRT'){
                    yerin.session.init('depart', '도쿄/나리타(NRT)');
                    if($("#selectBox3 option:selected").val() === 'KAL'){
                        yerin.session.init('depart_airline', '대한항공');
                    }else if($("#selectBox3 option:selected").val() === 'BA'){
                        yerin.session.init('depart_airline', '영국항공');
                    }else if($("#selectBox3 option:selected").val() === 'JAL'){
                        yerin.session.init('depart_airline', '일본항공');
                    }else if($("#selectBox3 option:selected").val() === 'FR'){
                        yerin.session.init('depart_airline', '에어프랑스');
                    }
                }else{
                    yerin.session.init('depart', '도쿄/하네다(HND)');
                    if($("#selectBox3 option:selected").val() === 'KAL'){
                        yerin.session.init('depart_airline', '대한항공');
                    }else if($("#selectBox3 option:selected").val() === 'BA'){
                        yerin.session.init('depart_airline', '영국항공');
                    }else if($("#selectBox3 option:selected").val() === 'JAL'){
                        yerin.session.init('depart_airline', '일본항공');
                    }else if($("#selectBox3 option:selected").val() === 'FR'){
                        yerin.session.init('depart_airline', '에어프랑스');
                    }
                }
            }else if($('#selectBox1 option:selected').val() === 'paris'){
                yerin.session.init('city1', 'paris');
                if ($("#selectBox2 option:selected").val() === 'CDG'){
                    yerin.session.init('depart', '파리/샤를드골(CDG)');
                    if($("#selectBox3 option:selected").val() === 'KAL'){
                        yerin.session.init('depart_airline', '대한항공');
                    }else if($("#selectBox3 option:selected").val() === 'BA'){
                        yerin.session.init('depart_airline', '영국항공');
                    }else if($("#selectBox3 option:selected").val() === 'JAL'){
                        yerin.session.init('depart_airline', '일본항공');
                    }else if($("#selectBox3 option:selected").val() === 'FR'){
                        yerin.session.init('depart_airline', '에어프랑스');
                    }
                }else{
                    yerin.session.init('depart', '파리/오를리(ORY)');
                    if($("#selectBox3 option:selected").val() === 'KAL'){
                        yerin.session.init('depart_airline', '대한항공');
                    }else if($("#selectBox3 option:selected").val() === 'BA'){
                        yerin.session.init('depart_airline', '영국항공');
                    }else if($("#selectBox3 option:selected").val() === 'JAL'){
                        yerin.session.init('depart_airline', '일본항공');
                    }else if($("#selectBox3 option:selected").val() === 'FR'){
                        yerin.session.init('depart_airline', '에어프랑스');
                    }
                }
            };
            if ($("#selectBox4 option:selected").val() === 'seoul') {
                yerin.session.init('city2', 'seoul');
                if ($("#selectBox5 option:selected").val() === 'ICN'){
                    yerin.session.init('arrive', '서울/인천(ICN)');
                    if($("#selectBox6 option:selected").val() === 'KAL'){
                        yerin.session.init('arrive_airline', '대한항공');
                    }else if($("#selectBox6 option:selected").val() === 'BA'){
                        yerin.session.init('arrive_airline', '영국항공');
                    }else if($("#selectBox6 option:selected").val() === 'JAL'){
                        yerin.session.init('arrive_airline', '일본항공');
                    }else if($("#selectBox6 option:selected").val() === 'FR'){
                        yerin.session.init('arrive_airline', '에어프랑스');
                    }
                }else{
                    yerin.session.init('arrive', '서울/김포(GMP)');
                    if($("#selectBox6 option:selected").val() === 'KAL'){
                        yerin.session.init('arrive_airline', '대한항공');
                    }else if($("#selectBox6 option:selected").val() === 'BA'){
                        yerin.session.init('arrive_airline', '영국항공');
                    }else if($("#selectBox6 option:selected").val() === 'JAL'){
                        yerin.session.init('arrive_airline', '일본항공');
                    }else if($("#selectBox6 option:selected").val() === 'FR'){
                        yerin.session.init('arrive_airline', '에어프랑스');
                    }
                }
            }else if($("#selectBox4 option:selected").val() === 'london'){
                yerin.session.init('city2', 'london');
                if ($("#selectBox5 option:selected").val() === 'LHW'){
                    yerin.session.init('arrive', '런던/히드로(LHW)');
                    if($("#selectBox6 option:selected").val() === 'KAL'){
                        yerin.session.init('arrive_airline', '대한항공');
                    }else if($("#selectBox6 option:selected").val() === 'BA'){
                        yerin.session.init('arrive_airline', '영국항공');
                    }else if($("#selectBox6 option:selected").val() === 'JAL'){
                        yerin.session.init('arrive_airline', '일본항공');
                    }else if($("#selectBox6 option:selected").val() === 'FR'){
                        yerin.session.init('arrive_airline', '에어프랑스');
                    }
                }else{
                    yerin.session.init('arrive', '런던/개트윅(LGW)');
                    if($("#selectBox6 option:selected").val() === 'KAL'){
                        yerin.session.init('arrive_airline', '대한항공');
                    }else if($("#selectBox6 option:selected").val() === 'BA'){
                        yerin.session.init('arrive_airline', '영국항공');
                    }else if($("#selectBox6 option:selected").val() === 'JAL'){
                        yerin.session.init('arrive_airline', '일본항공');
                    }else if($("#selectBox6 option:selected").val() === 'FR'){
                        yerin.session.init('arrive_airline', '에어프랑스');
                    }
                }
            }else if($('#selectBox4 option:selected').val() === 'tokyo'){
                yerin.session.init('city2', 'tokyo');
                if ($("#selectBox5 option:selected").val() === 'NRT'){
                    yerin.session.init('arrive', '도쿄/나리타(NRT)');
                    if($("#selectBox6 option:selected").val() === 'KAL'){
                        yerin.session.init('arrive_airline', '대한항공');
                    }else if($("#selectBox6 option:selected").val() === 'BA'){
                        yerin.session.init('arrive_airline', '영국항공');
                    }else if($("#selectBox6 option:selected").val() === 'JAL'){
                        yerin.session.init('arrive_airline', '일본항공');
                    }else if($("#selectBox6 option:selected").val() === 'FR'){
                        yerin.session.init('arrive_airline', '에어프랑스');
                    }
                }else{
                    yerin.session.init('arrive', '도쿄/하네다(HND)');
                    if($("#selectBox6 option:selected").val() === 'KAL'){
                        yerin.session.init('arrive_airline', '대한항공');
                    }else if($("#selectBox6 option:selected").val() === 'BA'){
                        yerin.session.init('arrive_airline', '영국항공');
                    }else if($("#selectBox6 option:selected").val() === 'JAL'){
                        yerin.session.init('arrive_airline', '일본항공');
                    }else if($("#selectBox6 option:selected").val() === 'FR'){
                        yerin.session.init('arrive_airline', '에어프랑스');
                    }
                }
            }else if($('#selectBox4 option:selected').val() === 'paris'){
                yerin.session.init('city2', 'paris');
                if ($("#selectBox5 option:selected").val() === 'CDG'){
                    yerin.session.init('arrive', '파리/샤를드골(CDG)');
                    if($("#selectBox6 option:selected").val() === 'KAL'){
                        yerin.session.init('arrive_airline', '대한항공');
                    }else if($("#selectBox6 option:selected").val() === 'BA'){
                        yerin.session.init('arrive_airline', '영국항공');
                    }else if($("#selectBox6 option:selected").val() === 'JAL'){
                        yerin.session.init('arrive_airline', '일본항공');
                    }else if($("#selectBox6 option:selected").val() === 'FR'){
                        yerin.session.init('arrive_airline', '에어프랑스');
                    }
                }else{
                    yerin.session.init('arrive', '파리/오를리(ORY)');
                    if($("#selectBox6 option:selected").val() === 'KAL'){
                        yerin.session.init('arrive_airline', '대한항공');
                    }else if($("#selectBox6 option:selected").val() === 'BA'){
                        yerin.session.init('arrive_airline', '영국항공');
                    }else if($("#selectBox6 option:selected").val() === 'JAL'){
                        yerin.session.init('arrive_airline', '일본항공');
                    }else if($("#selectBox6 option:selected").val() === 'FR'){
                        yerin.session.init('arrive_airline', '에어프랑스');
                    }
                }
            };
            yerin.session.init('departDate', $("#departDate").val());
            yerin.session.init('arriveDate', $("#arriveDate").val());
            if($("#selectBox2 option:selected").val() === $("#selectBox5 option:selected").val()){
                alert('출발지와 도착지를 다르게 입력하세요');
            }else {
                if ($("#departDate").val() === '') {
                    alert('출발 날짜를 입력하세요');
                } else {
                    if ($("#arriveDate").val() === '') {
                        alert('도착 날짜를 입력하세요');
                    } else {
                        yerin.searchResult.onCreate();
                    }
                }
            };
        });
        $('#viewDepartAirport').click(e=>{
            e.preventDefault();
            if ($("#selectBox1 option:selected").val() === 'seoul') {
                yerin.session.init('map-airport', 'seoul');
            }else if($("#selectBox1 option:selected").val() === 'london') {
                yerin.session.init('map-airport', 'london');
            }else if($("#selectBox1 option:selected").val() === 'tokyo') {
                yerin.session.init('map-airport', 'tokyo');
            }else if($("#selectBox1 option:selected").val() === 'paris') {
                yerin.session.init('map-airport', 'paris');
            }
/*            if ($("#selectBox2 option:selected").val() === 'ICN'){
                yerin.session.init('map-depart', '서울/인천(ICN)');
            }else if($("#selectBox2 option:selected").val() === 'GMP'){
                yerin.session.init('map-depart', '서울/김포(GMP)');
            }else if($("#selectBox2 option:selected").val() === 'LHW'){
                yerin.session.init('map-depart', '런던/히드로(LHW)');
            }else if($("#selectBox2 option:selected").val() === 'LGW'){
                yerin.session.init('map-depart', '런던/개트윅(LGW)');
            }else if($("#selectBox2 option:selected").val() === 'NRT'){
                yerin.session.init('map-depart', '도쿄/나리타(NRT)');
            }else if($("#selectBox2 option:selected").val() === 'HND'){
                yerin.session.init('map-depart', '도쿄/하네다(HND)');
            }else if($("#selectBox2 option:selected").val() === 'CDG'){
                yerin.session.init('map-depart', '파리/샤를드골(CDG)');
            }else if($("#selectBox2 option:selected").val() === 'ORY'){
                yerin.session.init('map-depart', '파리/오를리(ORY)');
            }*/
            yerin.modalPopup.onCreate();
        });
        $('#viewArriveAirport').click(e=>{
            e.preventDefault();
            if ($("#selectBox4 option:selected").val() === 'seoul') {
                yerin.session.init('map-airport', 'seoul');
            }else if($("#selectBox4 option:selected").val() === 'london') {
                yerin.session.init('map-airport', 'london');
            }else if($("#selectBox4 option:selected").val() === 'tokyo') {
                yerin.session.init('map-airport', 'tokyo');
            }else if($("#selectBox4 option:selected").val() === 'paris') {
                yerin.session.init('map-airport', 'paris');
            }
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
                'color':'white',
                'width':'100%',
                'height':'100%'
            });
        $('#icon-box').append(yerin.compUI.div('menuBtn'));
        $('#menuBtn').append(yerin.compUI.i('fa fa-bars'))
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
                'bottom':'0px',
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
            var airport = '';
            var airline = '';
                switch ($("#selectBox1 option:selected").val()){
                    case 'seoul' :
                        $('#selectBox2')
                            .html('    <option value="default">공항 선택</option>' +
                                "<option value='ICN'>서울, 인천국제공항(ICN)</option>" +
                                "<option value=GMP'>서울, 김포국제공항(GMP)</option>")
                            .change(()=>{
                                airport = $(this).find("option:selected").val();
                            });
                        $('#selectBox3')
                            .html('    <option value="default">항공사 선택</option>' +
                                "<option value='KAL'>대한항공</option>" +
                                "<option value='BA'>영국항공</option>" +
                                "<option value='JAL'>일본항공</option>" +
                                "<option value='FR'>에어프랑스</option>")
                            .change(()=>{
                                airline = $(this).find("option:selected").val();
                            });
                        break;
                    case 'london' :
                        $('#selectBox2')
                            .html('    <option value="default">공항 선택</option>' +
                                "<option value='LHW'>런던, 히드로국제공항(LHR)</option>" +
                                "<option value=LGW'>런던, 개트윅국제공항(LGW)</option>")
                            .change(()=>{
                                airport = $(this).find("option:selected").val();
                            });
                        $('#selectBox3')
                            .html('    <option value="default">항공사 선택</option>' +
                                "<option value='KAL'>대한항공</option>" +
                                "<option value='BA'>영국항공</option>" +
                                "<option value='JAL'>일본항공</option>" +
                                "<option value='FR'>에어프랑스</option>")
                            .change(()=>{
                                airline = $(this).find("option:selected").val();
                            });
                        break;
                    case 'tokyo' :
                        $('#selectBox2')
                            .html('    <option value="default">공항 선택</option>' +
                                "<option value='NRT'>도쿄, 나리타국제공항(NRT)</option>" +
                                "<option value='HND'>도쿄, 하네다국제공항(HND)</option>")
                            .change(()=>{
                                airport = $(this).find("option:selected").val();
                            });
                        $('#selectBox3')
                            .html('    <option value="default">항공사 선택</option>' +
                                "<option value='KAL'>대한항공</option>" +
                                "<option value='BA'>영국항공</option>" +
                                "<option value='JAL'>일본항공</option>" +
                                "<option value='FR'>에어프랑스</option>")
                            .change(()=>{
                                airline = $(this).find("option:selected").val();
                            });
                        break;
                    case 'paris' :
                        $('#selectBox2')
                        .html('    <option value="default">공항 선택</option>' +
                            "<option value='CDG' selected>파리, 샤를드골국제공항(CDG)</option>" +
                            "<option value='ORY'>파리, 오를리국제공항(ORY)</option>")
                        .change(()=>{
                            airport = $(this).find("option:selected").val();
                        });
                        $('#selectBox3')
                            .html('    <option value="default">항공사 선택</option>' +
                                "<option value='KAL'>대한항공</option>" +
                                "<option value='BA'>영국항공</option>" +
                                "<option value='JAL'>일본항공</option>" +
                                "<option value='FR'>에어프랑스</option>")
                            .change(()=>{
                                airline = $(this).find("option:selected").val();
                            });
                        break;
                }
            yerin.session.init('depart', airport);
            yerin.session.init('depart_airline', airline);
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
        $('#selectBox4').change(()=>{
            var os_val = $("#selectBox4 option:selected").val();
            var airport = '';
            var airline = '';
            switch (os_val){
                case 'seoul' :
                    $('#selectBox5')
                        .html('    <option value="default">도시 선택</option>' +
                            "<option value='ICN'>서울, 인천국제공항(ICN)</option>" +
                            "<option value=GMP'>서울, 김포국제공항(GMP)</option>")
                        .change(()=>{
                            airport = $(this).find("option:selected").val();
                        });
                    $('#selectBox6')
                        .html('    <option value="default">항공사 선택</option>' +
                            "<option value='KAL'>대한항공</option>" +
                            "<option value='BA'>영국항공</option>" +
                            "<option value='JAL'>일본항공</option>" +
                            "<option value='FR'>에어프랑스</option>")
                        .change(()=>{
                            airline = $(this).find("option:selected").val();
                        });
                    break;
                case 'london' :
                    $('#selectBox5')
                        .html('    <option value="default">도시 선택</option>' +
                            "<option value='LHW'>런던, 히드로국제공항(LHR)</option>" +
                            "<option value=LGW'>런던, 개트윅국제공항(LGW)</option>")
                        .change(()=>{
                            airport = $(this).find("option:selected").val();
                        });
                    $('#selectBox6')
                        .html('    <option value="default">항공사 선택</option>' +
                            "<option value='KAL'>대한항공</option>" +
                            "<option value='BA'>영국항공</option>" +
                            "<option value='JAL'>일본항공</option>" +
                            "<option value='FR'>에어프랑스</option>")
                        .change(()=>{
                            airline = $(this).find("option:selected").val();
                        });
                    break;
                case 'tokyo' :
                    $('#selectBox5')
                        .html('    <option value="default">도시 선택</option>' +
                            "<option value='NRT'>도쿄, 나리타국제공항(NRT)</option>" +
                            "<option value='HND'>도쿄, 하네다국제공항(HND)</option>")
                        .change(()=>{
                            airport = $(this).find("option:selected").val();
                        });
                    $('#selectBox6')
                        .html('    <option value="default">항공사 선택</option>' +
                            "<option value='KAL'>대한항공</option>" +
                            "<option value='BA'>영국항공</option>" +
                            "<option value='JAL'>일본항공</option>" +
                            "<option value='FR'>에어프랑스</option>")
                        .change(()=>{
                            airline = $(this).find("option:selected").val();
                        });
                    break;
                case 'paris' :
                    $('#selectBox5')
                        .html('    <option value="default">도시 선택</option>' +
                            "<option value='CDG' selected>파리, 샤를드골국제공항(CDG)</option>" +
                            "<option value='ORY'>파리, 오를리국제공항(ORY)</option>")
                        .change(()=>{
                            airport = $(this).find("option:selected").val();
                        });
                    $('#selectBox6')
                        .html('    <option value="default">항공사 선택</option>' +
                            "<option value='KAL'>대한항공</option>" +
                            "<option value='BA'>영국항공</option>" +
                            "<option value='JAL'>일본항공</option>" +
                            "<option value='FR'>에어프랑스</option>")
                        .change(()=>{
                            airline = $(this).find("option:selected").val();
                        });
                    break;
            }
            yerin.session.init('arrive', airport);
            yerin.session.init('arrive_airline', airline);
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
        $('#calendar').append(yerin.compUI.input('departDate', 'text'));
        $('#departDate').attr('placeholder', '출발일')
            .css({
                'width' : '150px',
                'font-size' : '20px'
            });
        $('#departDate').datepicker({
            dateFormat: "yy-mm-dd",
            dayNamesMin: [ "일", "월", "화", "수", "목", "금", "토" ],
            monthNames: [ "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월" ],
            monthNamesShort: [ "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월" ],
            defaultDate: "+1w",
            numberOfMonths: 1,
            minDate:"+0d",
            changeMonth: true,
            showMonthAfterYear: true ,
            changeYear: true,
            onClose: function( selectedDate ) {
                $( "#arriveDate" ).datepicker( "option", "minDate", selectedDate );
            }
        });
        $("#departDate").datepicker({
            dateFormat: "yy-mm-dd",
            defaultDate: "+1w",
            numberOfMonths: 1,
            changeMonth: true,
            showMonthAfterYear: true ,
            changeYear: true,
            onClose: function( selectedDate ) {
                if ($( "#arriveDate" ).val() < selectedDate)
                {
                    $( "#arriveDate" ).val(selectedDate);
                }
            }
        });
        $('#calendar').append(yerin.compUI.input('arriveDate', 'text'));
        $('#arriveDate').attr('placeholder', '도착일')
            .css({
                'width' : '150px',
                'font-size' : '20px'
            });
        $("#arriveDate").datepicker({
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
                $( "#departDate" ).datepicker( "option", "maxDate", selectedDate );
            }
        });
        $( "#arriveDate" ).datepicker({
            dateFormat: "yy-mm-dd",
            defaultDate: "+1w",
            numberOfMonths: 1,
            changeMonth: true,
            showMonthAfterYear: true ,
            changeYear: true,
            onClose: function( selectedDate ) {
                if ($("#departDate" ).val() > selectedDate)
                {
                    $("#departDate" ).val(selectedDate);
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
                'margin-left': '187px',
                'margin-top' : '50px'
            });
    };
    return {onCreate : onCreate, setContentView : setContentView};
})();

yerin.menuBar=(function () {
    var onCreate=function () {
        setContentView();
        $('#closeMenuIcon').click(e=>{
            e.preventDefault();
            $('body').empty();
            $('body').css({
                'background-color' : 'white'
            });
            $('body')
                .append(yerin.compUI.div('wrapper'));
            $('#wrapper')
                .css({
                    'position': 'relative',
                    'width' : '100%',
                    'height' : '100%',
                    'margin' : '0 auto',
                    'background-color' : '#00afcb',

                })
                .append(yerin.compUI.div('container'));
            yerin.main.onCreate();
        });
        $('#caretDownBtn').click(e=>{
            e.preventDefault();
            $('.callAgain').fadeOut("slow");
            $('.new-callAgain').empty();
            $('.new-callAgain').fadeIn("slow");
            $('#wrapper').addClass('layer-dark');
            $('#wrapper').css({
                'position': 'relative',
                'width' : '100%',
                'height' : '100%',
                'margin' : '0 auto',
                'opacity' : '0.5'
            });
            $('body').append(yerin.compUI.div('new-menuBar'));
            $('#new-menuBar').addClass('new-callAgain')
                .css({
                    'width' : '85%',
                    'height' : '100%',
                    'position' : 'absolute',
                    'top' : '0px',
                    'margin' : '0 auto',
                    'border-radius': '4px',

                });
            $('#new-menuBar').append(yerin.compUI.div('new-header'));
            $('#new-header').css({
                'width' : '100%',
                'height' : '30%',
                'position' : 'absolute',
                'top' : '0px',
                'margin' : '0 auto',
                'background': 'linear-gradient(to bottom right, #0099cc 0%, #00ffff 100%)'
            })
                .append(yerin.compUI.span('new-closeMenuIcon'));
            $('#new-closeMenuIcon').text('X')
                .css({
                    'position' : 'absolute',
                    "right": "10px",
                    "top ":"5px",
                    'font-size':'30px',
                    'color':'white'
                })
                .click(e=>{
                    e.preventDefault();
                    $('body').empty();
                    $('body').css({
                        'background-color' : 'white'
                    });
                    $('body')
                        .append(yerin.compUI.div('wrapper'));
                    $('#wrapper')
                        .css({
                            'position': 'relative',
                            'width' : '100%',
                            'height' : '100%',
                            'margin' : '0 auto',
                            'background-color' : '#00afcb',

                        })
                        .append(yerin.compUI.div('container'));
                    yerin.main.onCreate();
                });
            $('#new-header').append(yerin.compUI.span('new-myLoginDetail'));
            $('#new-myLoginDetail').text('hong@gmail.com')
                .css({
                    'position' : 'absolute',
                    'bottom': '15px',
                    'left' : '15px',
                    'color' : 'white',
                    'font-size' : '15px'
                });
            $('#new-header').append(yerin.compUI.div('new-caretDownBtn'));
            $('#new-caretDownBtn').append(yerin.compUI.i('fa fa-caret-down'));
            $('#new-caretDownBtn').css({
                'position' : 'absolute',
                'bottom': '15px',
                'right' : '15px',
                'color' : 'white',
                'font-size' : '20px'
            })
                .click(e=>{
                    e.preventDefault();
                    $('.new-callAgain').fadeOut("slow");
                    $('.callAgain').fadeIn("slow")

                });
            $('#new-menuBar').append(yerin.compUI.div('new-menu'));
            $('#new-menu')
                .css({
                    'position' : 'absolute',
                    'bottom' : '0px',
                    'width' : '100%',
                    'height' : '70%',
                    'background-color' : 'white',
                })
                .append(yerin.compUI.ul('new-menu-list','new-menu-list'));
            $('#new-menu-list').append(yerin.compUI.div('new-configIcon'));
            $('#new-configIcon').append(yerin.compUI.i('fa fa-cog'))
                .css({
                    'position' :'absolute',
                    'top' : '20px',
                    'color' : 'grey',
                    'font-size': '15px'
                });
            $('#new-menu-list').append(yerin.compUI.div('new-signoutIcon'));
            $('#new-signoutIcon').append(yerin.compUI.i('fa fa-sign-out'))
                .css({
                    'position' :'absolute',
                    'top' : '80px',
                    'color' : 'grey',
                    'font-size': '15px'
                });
            $('#new-menu-list').append('<br/><ul style="list-style-type:none; font-weight: bold; color: grey">' +
                '  <li >설정</li><hr/>' +
                '  <li id="new-logout">로그아웃</li>' +
                '</ul>');
            $('#new-logout').click(e=>{
                e.preventDefault();
                $('body').empty();
                $('body').css({
                    'background-color' : 'white'
                });
                $('body')
                    .append(yerin.compUI.div('wrapper'));
                $('#wrapper')
                    .css({
                        'position': 'relative',
                        'width' : '100%',
                        'height' : '100%',
                        'margin' : '0 auto',
                        'background-color' : '#00afcb',

                    })
                    .append(yerin.compUI.div('container'));
                yerin.login.onCreate();
            });
        });
        $('#goToSearchMain').click(e=>{
        e.preventDefault();
        $('body').empty();
        $('body').css({
            'background-color' : 'white'
        });
        $('body')
            .append(yerin.compUI.div('wrapper'));
        $('#wrapper')
            .css({
                'position': 'relative',
                'width' : '100%',
                'height' : '100%',
                'margin' : '0 auto',
                'background-color' : '#00afcb',

            })
            .append(yerin.compUI.div('container'));
        yerin.main.onCreate();
        });
        $('#infoBtn').click(e=>{
            e.preventDefault();
            $('body').empty();
            $('body').css({
                'background-color' : 'white'
            });
            $('body')
                .append(yerin.compUI.div('wrapper'));
            $('#wrapper')
                .css({
                    'position': 'relative',
                    'width' : '100%',
                    'height' : '100%',
                    'margin' : '0 auto',
                    'background-color' : '#1ba2cb',

                })
                .append(yerin.compUI.div('container'));
            yerin.information.onCreate();
        });
        $('#logout').click(e=>{
            e.preventDefault();
            $('body').empty();
            $('body').css({
                'background-color' : 'white'
            });
            $('body')
                .append(yerin.compUI.div('wrapper'));
            $('#wrapper')
                .css({
                    'position': 'relative',
                    'width' : '100%',
                    'height' : '100%',
                    'margin' : '0 auto',
                    'background-color' : '#00afcb',

                })
                .append(yerin.compUI.div('container'));
            yerin.login.onCreate();
        });
        $('#configuration').click(e=>{
           alert('구현되지 않은 기능입니다.') ;
        });
    };
    var setContentView=function () {
        $('#wrapper').addClass('layer-dark');
        $('#wrapper').css({
            'position': 'relative',
            'width' : '100%',
            'height' : '100%',
            'margin' : '0 auto',
            'opacity' : '0.5'

        });
        $('body').append(yerin.compUI.div('menuBar'));
        $('#menuBar')
            .css({
                'width' : '85%',
                'height' : '100%',
                'position' : 'absolute',
                'top' : '0px',
                'margin' : '0 auto',
                'border-radius': '4px',

            });
        $('#menuBar').append(yerin.compUI.div('header'));
        $('#header').css({
            'width' : '100%',
            'height' : '30%',
            'position' : 'absolute',
            'top' : '0px',
            'margin' : '0 auto',
            'background': 'linear-gradient(to bottom right, #0099cc 0%, #00ffff 100%)'
        })
            .append(yerin.compUI.span('closeMenuIcon'));
        $('#closeMenuIcon').text('X')
            .css({
                'position' : 'absolute',
                "right": "10px",
                "top ":"5px",
                'font-size':'30px',
                'color':'white'
            });
        $('#header').append(yerin.compUI.span('myLoginDetail'));
        $('#myLoginDetail').text('hong@gmail.com')
            .css({
                'position' : 'absolute',
                'bottom': '15px',
                'left' : '15px',
                'color' : 'white',
                'font-size' : '15px'
            });
        $('#header').append(yerin.compUI.div('caretDownBtn'));
        $('#caretDownBtn').append(yerin.compUI.i('fa fa-caret-down'));
        $('#caretDownBtn').css({
            'position' : 'absolute',
            'bottom': '15px',
            'right' : '15px',
            'color' : 'white',
            'font-size' : '20px'
        });
        $('#menuBar').append(yerin.compUI.div('menuContent'));
        $('#menuContent').addClass('callAgain')
            .css({
            'position' : 'absolute',
            'bottom' : '0px',
            'width' : '100%',
            'height' : '70%',
            'background-color' : 'white'
        })
            .append(yerin.compUI.ul('menu-list','menu-list'));
        $('#menu-list').append(yerin.compUI.div('magnifyIcon'));
        $('#magnifyIcon').append(yerin.compUI.i('fa fa-search'))
            .css({
                'position' :'absolute',
                'top' : '20px',
                'color' : 'grey',
                'font-size': '15px'
            });
        $('#menu-list').append(yerin.compUI.div('configIcon'));
        $('#configIcon').append(yerin.compUI.i('fa fa-cog'))
            .css({
                'position' :'absolute',
                'top' : '80px',
                'color' : 'grey',
                'font-size': '15px'
            });
        $('#menu-list').append(yerin.compUI.div('infoIcon'));
        $('#infoIcon').append(yerin.compUI.i('fa fa-info-circle'))
            .css({
                'position' :'absolute',
                'top' : '143px',
                'color' : 'grey',
                'font-size': '15px'
            });
        $('#menu-list').append(yerin.compUI.div('signoutIcon'));
        $('#signoutIcon').append(yerin.compUI.i('fa fa-sign-out'))
            .css({
                'position' :'absolute',
                'top' : '203px',
                'color' : 'grey',
                'font-size': '15px'
            });
        $('#menu-list').append('<br/><ul style="list-style-type:none; font-weight: bold; color: grey">' +
            '  <li id="goToSearchMain">새로 검색</li><hr/>' +
            '  <li id="configuration">설정</li><hr/>' +
            '  <li id="infoBtn">관련 정보</li><hr/>' +
            '  <li id="logout">로그아웃</li>' +
            '</ul>');
    };
    return {onCreate : onCreate};

})();

yerin.selectOption={
    depart : ()=>{
        return       '<span class="us-form-select-wrap" style="width: 70%; font-size: 20px">'
        +'    <select id="selectBox1">'
                +'    <option value="default">도시 선택</option>'
                +'    <option value="seoul" >서울</option>'
                +'    <option value="london" >런던</option>'
                +'    <option value="tokyo" >도쿄</option>'
                +'    <option value="paris" >파리</option> '
            +'</select>'
        +'</span>'
        +'<span class="us-form-select-wrap" style="width: 70%; font-size: 20px">'
            +'    <select id="selectBox2" style="width: 230px">'
            +'      <option value="default" >공항 선택</option>'
            +'</select>'
            +'</span>'
        +'<span class="us-form-select-wrap" style="width: 70%; font-size: 20px">'
        +'    <select id="selectBox3" style="width: 230px">'
        +'      <option value="default" >항공사 선택</option>'
        +'</select>'
        +'</span>'
    },
    arrive : ()=>{
        return       '<span class="us-form-select-wrap" style="width: 70%; font-size: 20px">'
            +'    <select id="selectBox4">'
            +'    <option value="default">도시 선택</option>'
            +'    <option value="seoul" >서울</option>'
            +'    <option value="london" >런던</option>'
            +'    <option value="tokyo" >도쿄</option>'
            +'    <option value="paris">파리</option> '
            +'</select>'
            +'</span>'
            +'<span class="us-form-select-wrap" style="width: 70%; font-size: 20px">'
            +'    <select id="selectBox5" style="width: 230px">'
            +'      <option value="default" >공항 선택</option>'
            +'</select>'
            +'</span>'
            +'<span class="us-form-select-wrap" style="width: 70%; font-size: 20px">'
            +'    <select id="selectBox6" style="width: 230px">'
            +'      <option value="default" >항공사 선택</option>'
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
            yerin.main.onCreate();

/*            switch(yerin.session.getSessionData('city1')){
                case 'seoul':
                    $("#selectBox1").html(yerin.session.getSessionData('city1'));
                    break;
                case 'london' :

                    break;
                case 'tokyo' :

                    break;
                case 'paris' :

                    break;

            }
            console.log('세션에 있는 값:' + yerin.session.getSessionData('city1'));
            $("#selectBox1 option:selected").val(yerin.session.getSessionData('city1'));

            $("#selectBox2 option:selected").val(yerin.session.getSessionData('depart'));
            $("#selectBox3 option:selected").val(yerin.session.getSessionData('depart_airline'));
            $("#selectBox4 option:selected").val(yerin.session.getSessionData('city2'));
            $("#selectBox5 option:selected").val(yerin.session.getSessionData('arrive'));
            $("#selectBox6 option:selected").val(yerin.session.getSessionData('arrive_airline'));*/
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

            })
            .append(yerin.compUI.span('header'));
        $('#header').append(yerin.compUI.span('headerText'));
        $('#headerText').text(yerin.session.getSessionData('map-airport')+' 근처 공항 보기')
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
        $('#modalPopup').append(yerin.compUI.div('popupContent'));
        $('#popupContent')
            .css({
                'position' : 'absolute',
                'bottom' : '0px',
                'width' : '100%',
                'height' : '90%',
                'background-color' : 'white'
            });
        $('#popupContent').append(yerin.compUI.span('modalContent'));
        $('#modalContent').append(yerin.compUI.div('googleMap'));
        $('#googleMap')
            .css({
                'height' : '100%',
                'width' : '100%'
            });

        $('#googleMap').load('map.html');

    };
    return {onCreate : onCreate, setContentView : setContentView};
})();

yerin.modalPopup2=(function () {
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
            yerin.main.onCreate();
            $("#selectBox1 option:selected").val(yerin.session.getSessionData('city1'));
            $("#selectBox2 option:selected").val(yerin.session.getSessionData('depart'));
            $("#selectBox3 option:selected").val(yerin.session.getSessionData('depart_airline'));
            $("#selectBox4 option:selected").val(yerin.session.getSessionData('city2'));
            $("#selectBox5 option:selected").val(yerin.session.getSessionData('arrive'));
            $("#selectBox6 option:selected").val(yerin.session.getSessionData('arrive_airline'));
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

            })
            .append(yerin.compUI.span('header'));
        $('#header').append(yerin.compUI.span('headerText'));
        $('#headerText').text(yerin.session.getSessionData('map-airport2')+' 근처 공항 보기')
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
        $('#modalPopup').append(yerin.compUI.div('popupContent'));
        $('#popupContent')
            .css({
                'position' : 'absolute',
                'bottom' : '0px',
                'width' : '100%',
                'height' : '90%',
                'background-color' : 'white'
            });
        $('#popupContent').append(yerin.compUI.span('modalContent'));
        $('#modalContent').append(yerin.compUI.div('googleMap'));
        $('#googleMap')
            .css({
                'height' : '300px',
                'width' : '100%',
                'position' : 'absolute',
                'top' : '130px'
            });
        $('#googleMap').load('map.html');
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
        $('#showPrice').click(e=>{
           e.preventDefault();
           $.ajax({
               async : false,
               url : 'json/flight.json',
               type : 'post',
               dataType : 'json',
               success : d => {
                   var depart_flight_price = 0;
                   var arrive_flight_price = 0;
                   for (var i=0; i<d.length; i++){
                       if (d[i].departCity === yerin.session.getSessionData('depart') && d[i].arriveCity === yerin.session.getSessionData('arrive')){
                           console.log('depart price : '+d[i].price);
                           depart_flight_price = d[i].price;
                       }
                   }
                   for (var i=0; i<d.length; i++){
                       if (d[i].departCity === yerin.session.getSessionData('arrive') && d[i].arriveCity === yerin.session.getSessionData('depart')){
                           console.log('arrive price : '+d[i].price);
                           arrive_flight_price = d[i].price;
                       }
                   }
                   var totalPrice = depart_flight_price*1 + arrive_flight_price*1;
                   $('#showPrice').text(totalPrice+'원')
                       .css({
                           'font-size' : '17px',
                           'background-color' : '#0099b2',
                           'border'  :'none',
                           'border-radius' : '4px',
                           'width': '100px',
                           'height': '30px',
                           'color' : 'white',
                           'font-weight' : 'bold'
                       });
               },
               error : e => {
                    alert('가격 보기 ajax통신 실패;');
               }
           });
        });
        $('#payBtn').click(e=>{
            e.preventDefault();
            yerin.passenger.onCreate();
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
        $('#backMainBtn').append(yerin.compUI.span('headerDepartCity'));
        $('#headerDepartCity').text(yerin.session.getSessionData('depart')+' - ')
            .css({
                "font-size":'15px',
                'padding-left':'10px'
            });
        $('#backMainBtn').append(yerin.compUI.span('headerArriveCity'));
        $('#headerArriveCity').text(yerin.session.getSessionData('arrive'))
            .css({
                "font-size":'15px'
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
        $('#listBlock').append(yerin.compUI.div('detailHeader'));
        $('#detailHeader').css({
            'width' : '95%',
            'height' : '60px',
            'margin-top' : '9px',
            'margin-left': '9px',
            'margin-bottom': '9px',
            'text-align' : 'center',
            'background-color' : '#e1e3e6'
        });
        $('#detailHeader').append(yerin.compUI.span('detailTitle'));
        $('#detailTitle').text('예약 정보')
            .css({
                'font-size' : '20px',
                'color' : 'grey'
            });
        $('#listBlock').append(yerin.compUI.div('depart-flight-list'));
        $('#depart-flight-list').css({
            'border' : '1px solid grey',
            'width' : '95%',
            'height' : '20%',
            'margin-top' : '9px',
            'margin-left': '9px',
            'margin-bottom': '9px'

        })
            .append(yerin.compUI.span('depart-flight-detail'));
        $.ajax({
            async : false,
            url : 'json/flight.json',
            type : 'post',
            dataType : 'json',
            success : d => {
                console.log(yerin.session.getSessionData('depart'));
                console.log(yerin.session.getSessionData('depart_airline'));
                var json_flight_no = '';
                var json_cabin_class ='';
                var json_departCity ='';
                var json_arriveCity ='';
                var json_airline='';
                for(var i=0; i<d.length; i++){
                    if(d[i].departCity === yerin.session.getSessionData('depart') && d[i].arriveCity === yerin.session.getSessionData('arrive') && d[i].airline === yerin.session.getSessionData('depart_airline')){
                        console.log('ddd'+d[i].flight_no);
                        json_flight_no = d[i].flight_no;
                        json_cabin_class = d[i].cabin_class;
                        json_departCity  = d[i].departCity;
                        json_arriveCity = d[i].arriveCity;
                        json_airline = d[i].airline;
                        yerin.session.init('depart_flight_no', json_flight_no);
                        yerin.session.init('depart_cabin_class', json_cabin_class);
                        yerin.session.init('depart_departCity', json_departCity);
                        yerin.session.init('depart_arriveCity', json_arriveCity);
                        yerin.session.init('depart_airline', json_airline);
                    }
                }
                $('#depart-flight-detail').append('<p style="font-size: 15px; padding-left: 10px; padding-top: 10px"><span id="flightNo1">'+json_flight_no+'</span> <span>| '+json_airline+' </span>| 일반석 ('+json_cabin_class+') 1석 </p>' +
                    '<p style="font-size: 15px; padding-left: 10px; padding-top: 10px">'+yerin.session.getSessionData('departDate')+' | 직항편 </p>' +
                    '<p style="font-size: 15px; padding-left: 10px;">'+json_departCity+' → '+json_arriveCity+'</p>');
            },
            error : e => {

            }
        });
        $.ajax({
            async : false,
            url : 'json/flight.json',
            type : 'post',
            dataType : 'json',
            success : d => {
                var json_flight_no = '';
                var json_cabin_class ='';
                var json_departCity ='';
                var json_arriveCity ='';
                var json_airline ='';
                console.log('arrive session' +yerin.session.getSessionData('arrive')+ yerin.session.getSessionData('depart')+ yerin.session.getSessionData('arrive_airline'));
                for(var i=0; i<d.length; i++){
                    if(d[i].departCity === yerin.session.getSessionData('arrive') && d[i].arriveCity === yerin.session.getSessionData('depart') && d[i].airline === yerin.session.getSessionData('arrive_airline')){
                        console.log('ddd'+d[i].airline);
                        json_flight_no = d[i].flight_no;
                        json_cabin_class = d[i].cabin_class;
                        json_departCity  = d[i].departCity;
                        json_arriveCity = d[i].arriveCity;
                        json_airline = d[i].airline;
                        yerin.session.init('arrive_flight_no', json_flight_no);
                        yerin.session.init('arrive_cabin_class', json_cabin_class);
                        yerin.session.init('arrive_departCity', json_departCity);
                        yerin.session.init('arrive_arriveCity', json_arriveCity);
                        yerin.session.init('arrive_airline', json_airline);
                    }
                }
                $('#listBlock').append(yerin.compUI.div('arrive-flight-list'));
                $('#arrive-flight-list').css({
                    'border' : '1px solid grey',
                    'width' : '95%',
                    'height' : '20%',
                    'margin-top' : '9px',
                    'margin-left': '9px',
                    'margin-bottom': '9px'
                })
                    .append(yerin.compUI.span('arrive-flight-detail'));
                $('#arrive-flight-detail').append('<p style="font-size: 15px; padding-left: 10px; padding-top: 10px"><span id="flightNo2">'+json_flight_no+' | '+json_airline+'</span> | 일반석 ('+json_cabin_class+') 1석 </p>' +
                    '<p style="font-size: 15px; padding-left: 10px; padding-top: 10px">'+yerin.session.getSessionData('arriveDate')+' | 직항편 </p>' +
                    '<p style="font-size: 15px; padding-left: 10px;">'+json_departCity+' → '+json_arriveCity+'</p>');
            },
            error : e => {
                alert('리턴 비행기디테일이 실패됨');
            }
        });

        $('#listBlock').append(yerin.compUI.div('total-price'));
        $('#total-price').css({
            'width' : '95%',
            'height' : '10%',
            'margin-left': '9px',
            'margin-bottom': '9px',
            'background-color' : '#0099b2'
        })
            .append(yerin.compUI.span('total-price-text'));
        $('#total-price-text').append('<span style="width: 100px; padding-top: 15px; font-size : 15px; color: white; padding-left: 10px;padding-right : 120px">총 결제금액</span>');
        $('#total-price-text').append(yerin.compUI.btn('showPrice'));
        $('#showPrice').text('가격 보기')
            .css({
                'font-size' : '15px',
                'background-color' : 'white',
                'border'  :'none',
                'border-radius' : '4px',
                'width': '100px',
                'height': '30px'
            });
        $('#listBlock').append(yerin.compUI.btn('payBtn'));
        $('#payBtn').text('선택')
            .css({
                'position' : 'absolute',
                'bottom' : '50px',
                'right' : '40px',
                'color' : 'white',
                'font-size' : '20px',
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
                'font-size' : '20px',
                'background-color' : '#81204e',
                'border': 'none',
                'border-radius': '4px',
                'width' : '100px',
                'height': '45px'
            });
    };
    return {onCreate : onCreate};
})();

yerin.passenger=(function () {
    var onCreate = function () {
        setContentView();
        $('#backSearchResultBtn').click(e=>{
            e.preventDefault();
            yerin.searchResult.onCreate();
        });
        function createReservationNo (length){
            var str = "";
            for( ; str.length < length; str += Math.random().toString( 36 ).substr( 2 ) );
            return str.substr( 0, length );
        }
        $('#goToPayBtn').click(e=>{
            e.preventDefault();
            var str=createReservationNo(10);
            console.log('랜덤 글자'+str);
            yerin.session.init('random', str);
            yerin.session.init('gender', $("#gender option:selected").val());
            yerin.session.init('surname', $("#surname").val());
            yerin.session.init('firstname', $("#firstname").val());
            yerin.session.init('country', $("#country option:selected").val());
            yerin.session.init('phone', $("#phone").val());
            yerin.session.init('email', $("#emailAddress").val());
            /*$.ajax({
                url:ctx+'/post/flightReserve',
                data : ({
                    "reservation_no" : yerin.session.getSessionData('random'),
                    "gender" : yerin.session.getSessionData('gender'),
                    "surname" : yerin.session.getSessionData('surname'),
                    "firstname" : yerin.session.getSessionData('firstname'),
                    "country" : yerin.session.getSessionData('country'),
                    "phone" : yerin.session.getSessionData('phone'),
                    "email" : yerin.session.getSessionData('email'),
                    "flight_no1" : yerin.session.getSessionData('depart_flight_no'),
                    "flight_no2" : yerin.session.getSessionData('arrive_flight_no'),
                    "airline" : yerin.session.getSessionData('arrive_airline'),
                    "cabin_class" : yerin.session.getSessionData('arrive_cabin_class'),
                    "departCity" : yerin.session.getSessionData('arrive_departCity'),
                    "arriveCity" : yerin.session.getSessionData('arrive_arriveCity'),
                    "departDate" : yerin.session.getSessionData('departDate'),
                    "arriveDate" : yerin.session.getSessionData('arriveDate')
                }),
                method : 'POST',
                contentType : 'application/json',
                success : d=> {
                    alert('결제 페이지로 이동합니다.');
                    yerin.pay.onCreate();
                },
                error : e => {
                }
            });*/
            if($('#surname').val()===''){
                alert('성을 입력하세요.');
            }
            if($('#firstname').val() === ''){
                alert('이름을 입력하세요');
            }
            if(yerin.valid.phone_checker($('#phone').val())==='yes'){
                if(yerin.valid.email_checker($('#emailAddress').val())==='yes'){
                    yerin.pay.onCreate();
                }else{
                    alert('이메일 주소를 확인해주세요.');
                    $('#emailAddress').val('');
                }
            }else{
                alert('휴대폰 번호는 숫자만 입력가능합니다.'+ $('#phone').val());
                $('#phone').val('');
            }
        });
        $('#goBacktoSearchBtn').click(e=>{
            e.preventDefault();
            yerin.searchResult.onCreate();
        });
    };
    var setContentView = function () {
        $('#container').empty();
        $('#container').html(yerin.compUI.div('icon-box1'))
            .css({
                'font-size':'30px',
                'color':'white',
            });
        $('#icon-box1').append(yerin.compUI.div('backSearchResultBtn'));
        $('#backSearchResultBtn').append(yerin.compUI.i('fa fa-arrow-left'))
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
                'color':'black'
            });
        $('#content').append(yerin.compUI.div('passengerDetail'));
        $('#passengerDetail')
            .css({
                'background-color':'#dadee5',
                'width':'100%',
                'height':'100%',
                'position':'absolute',
                'bottom':'0px'
            });
        $('#passengerDetail').append(yerin.compUI.div('passengerBlock'));
        $('#passengerBlock').css({
            'width': '95%',
            'height': '95%',
            'margin-top': '9px',
            'margin-left': '9px',
            'background-color': 'white',
            'border': '1px solid white'
        });
        $('#passengerBlock').append(yerin.compUI.div('passengerHeader'));
        $('#passengerHeader').css({
            'width' : '95%',
            'height' : '60px',
            'margin-top' : '9px',
            'margin-left': '9px',
            'margin-bottom': '9px',
            'text-align' : 'center',
            'background-color' : '#e1e3e6'
        });
        $('#passengerHeader').append(yerin.compUI.span('passengerTitle'));
        $('#passengerTitle').text('고객 정보 입력')
            .css({
                'font-size' : '20px',
                'color' : 'grey'
            });
        $('#passengerBlock').append(yerin.compUI.div('passengerContent'));
        $('#passengerContent').append(
            '<table style="width: 100%; font-size: 15px; text-align: center;">' +
            '<tr><td style="padding-left: 9px; width: 60px;">성별</td><td><select id="gender" style="float: left; margin-left: 30px; margin-top: 5px"><option value ="male">남자</option><option  value="female">여자</option></select></td></tr>' +
            '<tr><td style="padding-left: 9px; width: 60px;">성</td><td><input id="surname" type="text" style="width: 80%; margin-top: 5px" placeholder="성" value="hong"></td></tr>' +
            '<tr><td style="padding-left: 9px; width: 60px;">국적</td><td> <select id="country" style="float: left; margin-left: 30px; width: 80%; margin-top: 5px">' +
            '<option value="AFG">Afghanistan</option>' +
            '<option value="ALA">Åland Islands</option>' +
            '<option value="ALB">Albania</option>' +
            '<option value="DZA">Algeria</option>' +
            '<option value="ASM">American Samoa</option>' +
            '<option value="AND">Andorra</option>' +
            '<option value="AGO">Angola</option>' +
            '<option value="AIA">Anguilla</option>' +
            '<option value="ATA">Antarctica</option>' +
            '<option value="ATG">Antigua and Barbuda</option>' +
            '<option value="ARG">Argentina</option>' +
            '<option value="ARM">Armenia</option>' +
            '<option value="ABW">Aruba</option>' +
            '<option value="AUS">Australia</option>' +
            '<option value="AUT">Austria</option>' +
            '<option value="AZE">Azerbaijan</option>' +
            '<option value="BHS">Bahamas</option>' +
            '<option value="BHR">Bahrain</option>' +
            '<option value="BGD">Bangladesh</option>' +
            '<option value="BRB">Barbados</option>' +
            '<option value="BLR">Belarus</option>' +
            '<option value="BEL">Belgium</option>' +
            '<option value="BLZ">Belize</option>' +
            '<option value="BEN">Benin</option>' +
            '<option value="BMU">Bermuda</option>' +
            '<option value="BTN">Bhutan</option>' +
            '<option value="BOL">Bolivia, Plurinational State of</option>' +
            '<option value="BES">Bonaire, Sint Eustatius and Saba</option>' +
            '<option value="BIH">Bosnia and Herzegovina</option>' +
            '<option value="BWA">Botswana</option>' +
            '<option value="BVT">Bouvet Island</option>' +
            '<option value="BRA">Brazil</option>' +
            '<option value="IOT">British Indian Ocean Territory</option>' +
            '<option value="BRN">Brunei Darussalam</option>' +
            '<option value="BGR">Bulgaria</option>' +
            '<option value="BFA">Burkina Faso</option>' +
            '<option value="BDI">Burundi</option>' +
            '<option value="KHM">Cambodia</option>' +
            '<option value="CMR">Cameroon</option>' +
            '<option value="CAN">Canada</option>' +
            '<option value="CPV">Cape Verde</option>' +
            '<option value="CYM">Cayman Islands</option>' +
            '<option value="CAF">Central African Republic</option>' +
            '<option value="TCD">Chad</option>' +
            '<option value="CHL">Chile</option>' +
            '<option value="CHN">China</option>' +
            '<option value="CXR">Christmas Island</option>' +
            '<option value="CCK">Cocos (Keeling) Islands</option>' +
            '<option value="COL">Colombia</option>' +
            '<option value="COM">Comoros</option>' +
            '<option value="COG">Congo</option>' +
            '<option value="COD">Congo, the Democratic Republic of the</option>' +
            '<option value="COK">Cook Islands</option>' +
            '<option value="CRI">Costa Rica</option>' +
            '<option value="CIV">Côte d\'Ivoire</option>' +
            '<option value="HRV">Croatia</option>' +
            '<option value="CUB">Cuba</option>' +
            '<option value="CUW">Curaçao</option>' +
            '<option value="CYP">Cyprus</option>' +
            '<option value="CZE">Czech Republic</option>' +
            '<option value="DNK">Denmark</option>' +
            '<option value="DJI">Djibouti</option>' +
            '<option value="DMA">Dominica</option>' +
            '<option value="DOM">Dominican Republic</option>' +
            '<option value="ECU">Ecuador</option>' +
            '<option value="EGY">Egypt</option>' +
            '<option value="SLV">El Salvador</option>' +
            '<option value="GNQ">Equatorial Guinea</option>' +
            '<option value="ERI">Eritrea</option>' +
            '<option value="EST">Estonia</option>' +
            '<option value="ETH">Ethiopia</option>' +
            '<option value="FLK">Falkland Islands (Malvinas)</option>' +
            '<option value="FRO">Faroe Islands</option>' +
            '<option value="FJI">Fiji</option>' +
            '<option value="FIN">Finland</option>' +
            '<option value="FRA">France</option>' +
            '<option value="GUF">French Guiana</option>' +
            '<option value="PYF">French Polynesia</option>' +
            '<option value="ATF">French Southern Territories</option>' +
            '<option value="GAB">Gabon</option>' +
            '<option value="GMB">Gambia</option>' +
            '<option value="GEO">Georgia</option>' +
            '<option value="DEU">Germany</option>' +
            '<option value="GHA">Ghana</option>' +
            '<option value="GIB">Gibraltar</option>' +
            '<option value="GRC">Greece</option>' +
            '<option value="GRL">Greenland</option>' +
            '<option value="GRD">Grenada</option>' +
            '<option value="GLP">Guadeloupe</option>' +
            '<option value="GUM">Guam</option>' +
            '<option value="GTM">Guatemala</option>' +
            '<option value="GGY">Guernsey</option>' +
            '<option value="GIN">Guinea</option>' +
            '<option value="GNB">Guinea-Bissau</option>' +
            '<option value="GUY">Guyana</option>' +
            '<option value="HTI">Haiti</option>' +
            '<option value="HMD">Heard Island and McDonald Islands</option>' +
            '<option value="VAT">Holy See (Vatican City State)</option>' +
            '<option value="HND">Honduras</option>' +
            '<option value="HKG">Hong Kong</option>' +
            '<option value="HUN">Hungary</option>' +
            '<option value="ISL">Iceland</option>' +
            '<option value="IND">India</option>' +
            '<option value="IDN">Indonesia</option>' +
            '<option value="IRN">Iran, Islamic Republic of</option>' +
            '<option value="IRQ">Iraq</option>' +
            '<option value="IRL">Ireland</option>' +
            '<option value="IMN">Isle of Man</option>' +
            '<option value="ISR">Israel</option>' +
            '<option value="ITA">Italy</option>' +
            '<option value="JAM">Jamaica</option>' +
            '<option value="JPN">Japan</option>' +
            '<option value="JEY">Jersey</option>' +
            '<option value="JOR">Jordan</option>' +
            '<option value="KAZ">Kazakhstan</option>' +
            '<option value="KEN">Kenya</option>' +
            '<option value="KIR">Kiribati</option>' +
            '<option value="PRK">Korea, Democratic People\'s Republic of</option>' +
            '<option value="KOR">Korea, Republic of</option>' +
            '<option value="KWT">Kuwait</option>' +
            '<option value="KGZ">Kyrgyzstan</option>' +
            '<option value="LAO">Lao People\'s Democratic Republic</option>' +
            '<option value="LVA">Latvia</option>' +
            '<option value="LBN">Lebanon</option>' +
            '<option value="LSO">Lesotho</option>' +
            '<option value="LBR">Liberia</option>' +
            '<option value="LBY">Libya</option>' +
            '<option value="LIE">Liechtenstein</option>' +
            '<option value="LTU">Lithuania</option>' +
            '<option value="LUX">Luxembourg</option>' +
            '<option value="MAC">Macao</option>' +
            '<option value="MKD">Macedonia, the former Yugoslav Republic of</option>' +
            '<option value="MDG">Madagascar</option>' +
            '<option value="MWI">Malawi</option>' +
            '<option value="MYS">Malaysia</option>' +
            '<option value="MDV">Maldives</option>' +
            '<option value="MLI">Mali</option>' +
            '<option value="MLT">Malta</option>' +
            '<option value="MHL">Marshall Islands</option>' +
            '<option value="MTQ">Martinique</option>' +
            '<option value="MRT">Mauritania</option>' +
            '<option value="MUS">Mauritius</option>' +
            '<option value="MYT">Mayotte</option>' +
            '<option value="MEX">Mexico</option>' +
            '<option value="FSM">Micronesia, Federated States of</option>' +
            '<option value="MDA">Moldova, Republic of</option>' +
            '<option value="MCO">Monaco</option>' +
            '<option value="MNG">Mongolia</option>' +
            '<option value="MNE">Montenegro</option>' +
            '<option value="MSR">Montserrat</option>' +
            '<option value="MAR">Morocco</option>' +
            '<option value="MOZ">Mozambique</option>' +
            '<option value="MMR">Myanmar</option>' +
            '<option value="NAM">Namibia</option>' +
            '<option value="NRU">Nauru</option>' +
            '<option value="NPL">Nepal</option>' +
            '<option value="NLD">Netherlands</option>' +
            '<option value="NCL">New Caledonia</option>' +
            '<option value="NZL">New Zealand</option>' +
            '<option value="NIC">Nicaragua</option>' +
            '<option value="NER">Niger</option>' +
            '<option value="NGA">Nigeria</option>' +
            '<option value="NIU">Niue</option>' +
            '<option value="NFK">Norfolk Island</option>' +
            '<option value="MNP">Northern Mariana Islands</option>' +
            '<option value="NOR">Norway</option>' +
            '<option value="OMN">Oman</option>' +
            '<option value="PAK">Pakistan</option>' +
            '<option value="PLW">Palau</option>' +
            '<option value="PSE">Palestinian Territory, Occupied</option>' +
            '<option value="PAN">Panama</option>' +
            '<option value="PNG">Papua New Guinea</option>' +
            '<option value="PRY">Paraguay</option>' +
            '<option value="PER">Peru</option>' +
            '<option value="PHL">Philippines</option>' +
            '<option value="PCN">Pitcairn</option>' +
            '<option value="POL">Poland</option>' +
            '<option value="PRT">Portugal</option>' +
            '<option value="PRI">Puerto Rico</option>' +
            '<option value="QAT">Qatar</option>' +
            '<option value="REU">Réunion</option>' +
            '<option value="ROU">Romania</option>' +
            '<option value="RUS">Russian Federation</option>' +
            '<option value="RWA">Rwanda</option>' +
            '<option value="BLM">Saint Barthélemy</option>' +
            '<option value="SHN">Saint Helena, Ascension and Tristan da Cunha</option>' +
            '<option value="KNA">Saint Kitts and Nevis</option>' +
            '<option value="LCA">Saint Lucia</option>' +
            '<option value="MAF">Saint Martin (French part)</option>' +
            '<option value="SPM">Saint Pierre and Miquelon</option>' +
            '<option value="VCT">Saint Vincent and the Grenadines</option>' +
            '<option value="WSM">Samoa</option>' +
            '<option value="SMR">San Marino</option>' +
            '<option value="STP">Sao Tome and Principe</option>' +
            '<option value="SAU">Saudi Arabia</option>' +
            '<option value="SEN">Senegal</option>' +
            '<option value="SRB">Serbia</option>' +
            '<option value="SYC">Seychelles</option>' +
            '<option value="SLE">Sierra Leone</option>' +
            '<option value="SGP">Singapore</option>' +
            '<option value="SXM">Sint Maarten (Dutch part)</option>' +
            '<option value="SVK">Slovakia</option>' +
            '<option value="SVN">Slovenia</option>' +
            '<option value="SLB">Solomon Islands</option>' +
            '<option value="SOM">Somalia</option>' +
            '<option value="ZAF">South Africa</option>' +
            '<option value="SGS">South Georgia and the South Sandwich Islands</option>' +
            '<option value="SSD">South Sudan</option>' +
            '<option value="ESP">Spain</option>' +
            '<option value="LKA">Sri Lanka</option>' +
            '<option value="SDN">Sudan</option>' +
            '<option value="SUR">Suriname</option>' +
            '<option value="SJM">Svalbard and Jan Mayen</option>' +
            '<option value="SWZ">Swaziland</option>' +
            '<option value="SWE">Sweden</option>' +
            '<option value="CHE">Switzerland</option>' +
            '<option value="SYR">Syrian Arab Republic</option>' +
            '<option value="TWN">Taiwan, Province of China</option>' +
            '<option value="TJK">Tajikistan</option>' +
            '<option value="TZA">Tanzania, United Republic of</option>' +
            '<option value="THA">Thailand</option>' +
            '<option value="TLS">Timor-Leste</option>' +
            '<option value="TGO">Togo</option>' +
            '<option value="TKL">Tokelau</option>' +
            '<option value="TON">Tonga</option>' +
            '<option value="TTO">Trinidad and Tobago</option>' +
            '<option value="TUN">Tunisia</option>' +
            '<option value="TUR">Turkey</option>' +
            '<option value="TKM">Turkmenistan</option>' +
            '<option value="TCA">Turks and Caicos Islands</option>' +
            '<option value="TUV">Tuvalu</option>' +
            '<option value="UGA">Uganda</option>' +
            '<option value="UKR">Ukraine</option>' +
            '<option value="ARE">United Arab Emirates</option>' +
            '<option value="GBR">United Kingdom</option>' +
            '<option value="USA">United States</option>' +
            '<option value="UMI">United States Minor Outlying Islands</option>' +
            '<option value="URY">Uruguay</option>' +
            '<option value="UZB">Uzbekistan</option>' +
            '<option value="VUT">Vanuatu</option>' +
            '<option value="VEN">Venezuela, Bolivarian Republic of</option>' +
            '<option value="VNM">Viet Nam</option>' +
            '<option value="VGB">Virgin Islands, British</option>' +
            '<option value="VIR">Virgin Islands, U.S.</option>' +
            '<option value="WLF">Wallis and Futuna</option>' +
            '<option value="ESH">Western Sahara</option>' +
            '<option value="YEM">Yemen</option>' +
            '<option value="ZMB">Zambia</option>' +
            '<option value="ZWE">Zimbabwe</option></select></td></tr>' +
            '<tr><td style="padding-left: 9px; width: 60px;">이름</td><td><input id="firstname"type="text" style="width: 80%; margin-top: 5px" placeholder="이름" value="gildong"></td></tr>' +
            '<tr><td style="padding-left: 9px; width: 60px;">휴대폰</td><td><input id="phone"type="text" style="width: 80%; margin-top: 5px" placeholder="01012345678" value="01012345678"></td></tr>' +
            '<tr><td style="padding-left: 9px; width: 60px;">이메일</td><td><input id="emailAddress"type="text" style="width: 80%; margin-top: 5px" placeholder="abc@abc.com" value="abc@abc.com"></td></tr></table><br/>');
        $('#passengerContent').append(yerin.compUI.div('detailInfo'));
        $('#detailInfo').append('<p style="padding : 10px; font-size: 13px; color:gray;">※예약 후 성명 변경은 불가하오니 실제 탑승하실 분의 여권에 기재된 영문 성명으로 정확하게 입력하시기 바랍니다.</p>');
        $('#passengerContent').append(yerin.compUI.btn('goToPayBtn'));
        $('#goToPayBtn').text('결제')
            .css({
                'position' : 'absolute',
                'bottom' : '50px',
                'right' : '40px',
                'color' : 'white',
                'font-size' : '20px',
                'background-color' : '#00afcb',
                'border': 'none',
                'border-radius': '4px',
                'width' : '100px',
                'height': '45px'
            });
        $('#passengerContent').append(yerin.compUI.btn('goBacktoSearchBtn'));
        $('#goBacktoSearchBtn').text('취소')
            .css({
                'position' : 'absolute',
                'bottom' : '50px',
                'left' : '40px',
                'color' : 'white',
                'font-size' : '20px',
                'background-color' : '#81204e',
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
            e.preventDefault();
            if(yerin.valid.email_checker($('#writePayEmail').val())==='yes'){
                if(yerin.valid.cardNumber_checker($('#writeCardDetail').val()*1)){
                    yerin.final.onCreate();
                }else{
                    alert('숫자만 입력 가능');
                    $('#writeCardDetail').val('');
                }
            }else{
                alert('이메일 주소를 확인해주세요.');
                $('#writePayEmail').val('');
            }
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
                'placeholder' : 'abc@abc.com',
                'value' : 'abc@abc.com'
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
                'placeholder' : '16자리 카드 번호',
                'value' : '11111'
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
    phone_checker: x => {
        var regNumber = /^[0-9]*$/;
        return regNumber.test(x)? "yes" : "no";
    },
    email_checker : x => {
        var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        return regExp.test(x)? "yes" : "no";
    },
    cardNumber_checker : x=> {
        return typeof x === 'number' && isFinite(x);
    }
};

yerin.final=(function () {
    var onCreate= function () {
        setContentView();
        $('#goBackToMainFinal').click(e=>{
            e.preventDefault();
            yerin.main.onCreate();
        });
    }
    var setContentView = function () {
        $('#content').empty();
        $('#content').css({
            'background-color':'white',
            'text-align' : 'center'
        });
        $('#content').append(yerin.compUI.div('finalText'));
        $('#finalText').css({
            'width' : '95%',
            'height' : '60px',
            'margin-top' : '9px',
            'margin-left': '9px',
            'margin-bottom': '9px',
            'text-align' : 'center',
            'background-color' : '#e1e3e6'
        });
        $('#finalText').append(yerin.compUI.span('final-title'))
        $('#final-title').text('결제 완료')
            .css({
                'font-size' : '20px',
                'color' : 'grey'
            });
        $('#content').append(yerin.compUI.div('printReserveNo'));;
        $('#printReserveNo').append(yerin.compUI.span('reserveNo'))
            .css({
                'width': '95%',
                'height' : '50px',
                'margin-bottom' : '9px',
                'margin-left' : '9px',
                'text-align' : 'center',
                'font-size' : '25px'
            });
        $.ajax({
            async : false,
            url : 'json/flightReservation.json',
            type : 'post',
            dataType : 'json',
            success : d => {
                for(var i=0; i<d[i].length; i++){
                    if (d[i].reservationNo === yerin.session.getSessionData('random')){
                            var result = d[i];
                            console.log(result.reservationNo);
                        $('#reserveNo').text('예약번호: '+d[i].reservationNo);
                        $('#content').append('<p style="font-size:15px;float: left; margin-left: 15px; width: 90%; text-align: left">성별: '+result.gender+'</p>' +
                            '<p style="font-size:15px; float: left; margin-left: 15px; width: 90%; text-align: left"> 성: '+result.surname+'</p>' +
                            '<p style="font-size:15px;float: left; margin-left: 15px; width: 90%; text-align: left">이름: '+result.firstname+'</p>' +
                            '<p style="font-size:15px;float: left; margin-left: 15px; width: 90%; text-align: left">전화번호: '+result.phone+'</p>' +
                            '<p style="font-size:15px;float: left; margin-left: 15px; width: 90%; text-align: left">이메일: '+result.email+'</p>'
                        );
                    }
                }
            },
            error : e => {
                alert('final detail error;;;');
            }
        });
        $('#content').append(yerin.compUI.div('final-depart-flight-list'));
        $('#final-depart-flight-list').css({
            'border': '1px solid grey',
            'width': '95%',
            'height': '20%',
            'margin-top': '9px',
            'margin-left': '9px',
            'margin-bottom': '9px',
            'position': 'absolute',
            'top': '280px'
        })
            .append(yerin.compUI.span('final-depart-flight-detail'));
        $.ajax({
            async : false,
            url : 'json/flight.json',
            type : 'post',
            dataType : 'json',
            success : d => {
                var json_flight_no = '';
                var json_cabin_class ='';
                var json_departCity ='';
                var json_arriveCity ='';
                var json_airline='';
                for(var i=0; i<d.length; i++){
                    if(d[i].departCity === yerin.session.getSessionData('depart') && d[i].arriveCity === yerin.session.getSessionData('arrive') && d[i].airline === yerin.session.getSessionData('depart_airline')){
                        console.log('ddd'+d[i].flight_no);
                        json_flight_no = d[i].flight_no;
                        json_cabin_class = d[i].cabin_class;
                        json_departCity  = d[i].departCity;
                        json_arriveCity = d[i].arriveCity;
                        json_airline = d[i].airline;
                        yerin.session.init('depart_flight_no', json_flight_no);
                        yerin.session.init('depart_cabin_class', json_cabin_class);
                        yerin.session.init('depart_departCity', json_departCity);
                        yerin.session.init('depart_arriveCity', json_arriveCity);
                        yerin.session.init('depart_airline', json_airline);
                    }
                }
                $('#final-depart-flight-detail').append('<p style="font-size: 15px; padding-left: 10px; padding-top: 10px"><span id="flightNo1">'+json_flight_no+'</span> <span>| '+json_airline+' </span>| 일반석 ('+json_cabin_class+') 1석 </p>' +
                    '<p style="font-size: 15px; padding-left: 10px; padding-top: 10px">'+yerin.session.getSessionData('departDate')+' | 직항편 </p>' +
                    '<p style="font-size: 15px; padding-left: 10px;">'+json_departCity+' → '+json_arriveCity+'</p>');
            },
            error : e => {

            }
        });
        $.ajax({
            async : false,
            url : 'json/flight.json',
            type : 'post',
            dataType : 'json',
            success : d => {
                var json_flight_no = '';
                var json_cabin_class ='';
                var json_departCity ='';
                var json_arriveCity ='';
                var json_airline ='';
                console.log('arrive session' +yerin.session.getSessionData('arrive')+ yerin.session.getSessionData('depart')+ yerin.session.getSessionData('arrive_airline'));
                for(var i=0; i<d.length; i++){
                    if(d[i].departCity === yerin.session.getSessionData('arrive') && d[i].arriveCity === yerin.session.getSessionData('depart') && d[i].airline === yerin.session.getSessionData('arrive_airline')){
                        console.log('ddd'+d[i].airline);
                        json_flight_no = d[i].flight_no;
                        json_cabin_class = d[i].cabin_class;
                        json_departCity  = d[i].departCity;
                        json_arriveCity = d[i].arriveCity;
                        json_airline = d[i].airline;
                        yerin.session.init('arrive_flight_no', json_flight_no);
                        yerin.session.init('arrive_cabin_class', json_cabin_class);
                        yerin.session.init('arrive_departCity', json_departCity);
                        yerin.session.init('arrive_arriveCity', json_arriveCity);
                        yerin.session.init('arrive_airline', json_airline);
                    }
                }
                $('#content').append(yerin.compUI.div('final-arrive-flight-list'));
                $('#final-arrive-flight-list').css({
                    'border' : '1px solid grey',
                    'width' : '95%',
                    'height' : '20%',
                    'margin-top' : '9px',
                    'margin-left': '9px',
                    'margin-bottom': '9px',
                    'position': 'absolute',
                    'top': '400px'
            })
                    .append(yerin.compUI.span('final-arrive-flight-detail'));
                $('#final-arrive-flight-detail').append('<p style="font-size: 15px; padding-left: 10px; padding-top: 10px"><span id="flightNo2">'+json_flight_no+' | '+json_airline+'</span> | 일반석 ('+json_cabin_class+') 1석 </p>' +
                    '<p style="font-size: 15px; padding-left: 10px; padding-top: 10px">'+yerin.session.getSessionData('arriveDate')+' | 직항편 </p>' +
                    '<p style="font-size: 15px; padding-left: 10px;">'+json_departCity+' → '+json_arriveCity+'</p>');
            },
            error : e => {
                alert('리턴 비행기디테일이 실패됨');
            }
        });
        $('#content').append(yerin.compUI.btn('goBackToMainFinal'));
        $('#goBackToMainFinal').text('메인으로')
            .css({
                'position': 'absolute',
                'top': '530px',
                'background-color':'#00afcb',
                'color':'white',
                'border': 'none',
                'border-radius': '4px',
                'height': '45px'
            });
    };
    return {onCreate : onCreate};
})();

yerin.information = (function () {
    var onCreate = function () {
        setContentView();
        $('#goToSearchMain-info').click(e=>{
            e.preventDefault();
            $('body').empty();
            $('body').css({
                'background-color' : 'white'
            });
            $('body')
                .append(yerin.compUI.div('wrapper'));
            $('#wrapper')
                .css({
                    'position': 'relative',
                    'width' : '100%',
                    'height' : '100%',
                    'margin' : '0 auto',
                    'background-color' : '#00afcb',

                })
                .append(yerin.compUI.div('container'));
            yerin.main.onCreate();
        });
        $('#logout-info').click(e=>{
            e.preventDefault();
            $('body').empty();
            $('body')
                .append(yerin.compUI.div('wrapper'));
            $('#wrapper')
                .css({
                    'position': 'relative',
                    'width' : '100%',
                    'height' : '100%',
                    'margin' : '0 auto',
                    'background-color' : '#1ba2cb',

                })
                .append(yerin.compUI.div('container'));
            yerin.login.onCreate();
        });
        $('#configure').click(e=>{
           alert('구현되지 않은 기능입니다.');
        });
        $('#backToMainBtn-info').click(e=>{
           e.preventDefault();
           yerin.menuBar.onCreate();
        });
    };
    var setContentView = function () {
        $('#container').html(yerin.compUI.div('icon-box'))
            .css({
                'font-size':'30px',
                'color':'white',
                'width':'100%',
                'height':'100%'
            });
        $('#icon-box').append(yerin.compUI.div('backToMainBtn-info'));
        $('#backToMainBtn-info').append(yerin.compUI.i('fa fa-arrow-left'))
            .css({
                "padding-left": "20px",
                "padding-top":"10px"
            });
        $('#container').append(yerin.compUI.div('content'));
        $('#content').append(yerin.compUI.div('logo-box'));
        $('#logo-box').append(yerin.compUI.image('logo1', 'https://static1.squarespace.com/static/57b584a91b631bc09935382c/t/589c9e4ae4fcb56412fad1ee/1486659177483/?format=300w'))
            .css({
                'text-align' : 'center'
            });
        $('#content').append(yerin.compUI.div('info-content'));
        $('#info-content').append(yerin.compUI.span('info-text'));
        $('#info-text').append('<p style="color:white; padding : 20px; font-size: 13px">스카이스캐너 올인원 앱을 사용하여 스마트한 여행을 누리세요.' +
            '언제 어디서든 신속하게 원하는 품목을 검색, 비교하여 저렴한 항공편, 호텔과 렌터카를 예약할 수 있습니다.' +
            '독립적이고 편파적이지 않으며 완전히 무료로 운영되는 스카이스캐너는 여러분에게 가장 잘 맞는 최선의 상품을 몇 초 안에 찾아내 드립니다.</p>');
        $('#info-text').append('<p style="color:white; padding-left: 20px; padding-right: 20px; font-size: 13px">수상 경력에 빛나는 간편한 사용법의 앱으로 글로벌 여행 검색 엔진을 이용할 수 있습니다.</p><hr/>');
        $('#info-content').append(yerin.compUI.span('info-lists'));
        $('#info-lists').append('<ul style="list-style-type:none; color: white; font-size: 13px">' +
            '  <li id="goToSearchMain-info">새로 검색</li><hr/>' +
            '  <li id="configure">설정</li><hr/>' +
            '  <li >버젼: 5.28</li><hr/>' +
            '  <li id="logout-info">로그아웃</li>' +
            '</ul>')

    };
    return {onCreate : onCreate};
})();

yerin.cookie={
    setCookie:(k,v)=>{
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

yerin.session={
    JSON :(k,v)=>{
        sessionStorage.setItem(k, JSON.stringify(v));
    },
    getJSON : k=>{
        return JSON.parse(sessionStorage.getItem(k));
    },
    init : (k,v) => {
        sessionStorage.setItem(k,v);
    },
    getSessionData : k => {
        return sessionStorage.getItem(k);
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