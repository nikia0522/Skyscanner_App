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
        $('#wrapper').css({'width':'100%', 'height':'100%','background-color':'#008ca8'}).html(yerin.compUI.div('container'));
        $('#container').html(yerin.compUI.div('icon-box')).css({'font-size':'30px', 'color':'white'});
        $('#icon-box').append(yerin.compUI.i('fa fa-arrow-left')).css({"padding-left": "20px","padding-top":"10px"});
        $('#container').append(yerin.compUI.div('content'));
        $('#content').css({'width':'100%', 'height':'90%', 'position':'absolute', 'bottom':'0px'});
        $('#content').append(yerin.compUI.div('loginTxtDiv'));
        $('#loginTxtDiv').css({'width':'100%', 'text-align':'center', 'color':'white', 'margin-top':'50px', 'margin-bottom':'100px'});
        $('#loginTxtDiv').html(yerin.compUI.span('loginTxt1'));
        $('#loginTxt1').text('등록 또는 로그인').css({'font-size':'23px'});
        $('#loginTxt1').append(yerin.compUI.br());
        $('#loginTxtDiv').append(yerin.compUI.span('loginTxt2'));
        $('#loginTxt2').text('모든 장치와 동기화할 수 있습니다.').css({'font-size':'18px'});
        $('#content').append(yerin.compUI.div('joinDiv'));
        $('#joinDiv').css({'text-align':'center', 'margin-bottom':'140px'});
        $('#joinDiv').append(yerin.compUI.div('googleSign'));
        $('#googleSign').addClass('g-signin2').attr('data-onsuccess','onSignIn').css({'margin': '0 auto'});
        $('#joinDiv').append(yerin.compUI.span('emailJoin'));
        $('#emailJoin').text('이메일로 가입').css({'font-size':'18px'});
        $('#content').append(yerin.compUI.div('loginDiv'));
        $('#loginDiv').append(yerin.compUI.span('loginText')).css({'text-align':'center'});
        $('#loginText').text('이미 계정이 있으신가요? ').css({'font-size':'18px'});
        $('#loginDiv').append(yerin.compUI.span('loginBtn'));
        $('#loginBtn').text('로그인').css({'font-size':'19px'});
        $('#loginDiv').append(yerin.compUI.hr());
        $('#loginDiv').append(yerin.compUI.span('agreement'));
        $('#agreement').text('가입함으로써 이용 약관 및 개인정보처리방침에 동의합니다.').css({'font-size':'13px'});

    };
    return {onCreate : onCreate};
})();

yerin.login=(function () {
    var onCreate = function () {
        setContentView();
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
        $('#container').css({'font-size':'30px', 'color':'white'});
        $('#container').html(yerin.compUI.div('icon-box'));
        $('#icon-box').css({"padding-left": "20px","padding-top":"10px"}).append(yerin.compUI.i('fa fa-close'));
        $('#icon-box').append(yerin.compUI.span('loginTxt'));
        $('#loginTxt').css({"font-size":'25px'}).text(' 로그인');
        $('#container').append(yerin.compUI.div('content'));
        $('#content').css({'width':'100%', 'height':'90%', 'position':'absolute', 'bottom':'0px'});
        $('#content').css({'background-color':'white', 'text-align':'center'});
        $('#content').append(yerin.compUI.div('image-box'));
        $('#image-box').css({'margin-top':'30px','margin-bottom':'30px'});
        $('#image-box').append(yerin.compUI.image('logo','https://upload.wikimedia.org/wikipedia/commons/7/76/Skyscanner_Logo_New.png'));
        $('#logo').css({'width':'200px','height':'50px'})
        $('#content').append(yerin.compUI.div('loginDiv'));
        $('#loginDiv').append(yerin.compUI.input('id','text'));
        $('#id').attr('placeholder','이메일')
            .css({
                'width':'90%','font-size':'20px', 'color':'black','margin-bottom':'50px',
                'border-top-style': 'hidden',
                'border-right-style': 'hidden',
                'border-left-style': 'hidden',
                'border-bottom-style': '2px solid black'
            });
        $('#loginDiv').append(yerin.compUI.input('pass','text'));
        $('#pass').attr('placeholder','비밀번호')
            .css({
                'width':'90%','font-size':'20px', 'color':'black', 'margin-bottom':'100px',
                'border-top-style': 'hidden',
                'border-right-style': 'hidden',
                'border-left-style': 'hidden',
                'border-bottom-style': '2px solid black'
            });
        $('#content').append(yerin.compUI.div('loginFoot'));
        $('#loginFoot').css({'width':'100%','position':'absolute', 'bottom':'40px'});
        $('#loginFoot').append(yerin.compUI.hr());
        $('#loginFoot').append(yerin.compUI.span('forgotPass'));
        $('#forgotPass').text('비밀번호를 잊으셨나요?').css({'position':'absolute', 'left':'20px','color':'black','font-size':'15px'});
        $('#loginFoot').append(yerin.compUI.span('confirmBtn'));
        $('#confirmBtn').text('로그인').css({'position':'absolute', 'right':'20px','color':'#008ca8','font-size':'15px'});

    };
    return {onCreate : onCreate};
})();

yerin.main=(function () {
    var onCreate=function () {
        setContentView();
    };
    var setContentView=function () {
        $('#container').empty();
        $('#container').html(yerin.compUI.div('icon-box')).css({'font-size':'30px', 'color':'white'});
        $('#icon-box').append(yerin.compUI.i('fa fa-arrow-left')).css({"padding-left": "20px","padding-top":"10px"});
        $('#container').append(yerin.compUI.div('content'));
        $('#content').css({'width':'100%', 'height':'90%', 'position':'absolute', 'bottom':'0px'});
        $('#content').css({'background-color':'white', 'text-align':'center'});
        $('#content').append(yerin.compUI.div('selectBtns'));
        $('#selectBtns').css({'color':'black'});
        $('#selectBtns').append(yerin.compUI.span('departCity'));
        $('#departCity').text('출발지').css({'font-size':'20px'});
        $('#departCity').append(yerin.selectOption.cities());
        $('#selectBtns').append(yerin.compUI.span('arriveCity'));
        $('#arriveCity').text('도착지').css({'font-size':'20px'});
        $('#arriveCity').append(yerin.selectOption.cities());
        $('#selectBtns').append(yerin.compUI.div('selectDate'));
        $('#selectDate').append(yerin.compUI.div('calendar'));
        $('#calendar').append(yerin.compUI.btn('selectDateBtn'));
        $('#selectDateBtn')
            .text('날짜 선택하기')
            .addClass('btn btn-default')
            .css({'color':'black','margin':'30px auto', 'margin-right' : '20px'})
            .click(e=>{
            $('#calendar').datepicker({
                language:"kr",
                format: "yyyy-mm-dd",
                startDate : "+0d",
                endDate : "+3d",
                todayHighlight: true,
                autoclose : true
            });
        });
    };
    return {onCreate : onCreate};
})();
yerin.selectOption={
    cities : ()=>{
        return       '<span class="us-form-select-wrap">'
        +'    <select>'
                +'    <option>선택하세요</option>'
                +'    <option>서울</option>'
                +'    <option>런던</option>'
                +'    <option>도쿄</option>'
                +'    <option>베이징</option> '
            +'</select>'
        +'</span>'
    }
};
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
    i : x=>{return $('<i/>',{class:x})}
};
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}
$(function(){
    yerin.initialize();
});
yerin.initialize();