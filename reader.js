

function connect() {
//        clearForm();
        var CVR_IDCard = document.getElementById("plugin");
        var ret = CVR_IDCard.connect();
       ret = JStrToObj(ret);
//        DisplayInfo(ret);
        return ret;
}

function getStatus() {
//    clearForm();
    var CVR_IDCard = document.getElementById("plugin");
    var ret = CVR_IDCard.getStatus();
    ret = JStrToObj(ret);
    return ret;
}

function readCert() {
    // clearForm();
    var CVR_IDCard = document.getElementById("plugin");
    var ret = CVR_IDCard.readCert();
    ret = JStrToObj(ret);
//    if (ret.resultFlag==-1){
//        DisplayInfo(ret);
//    }else{
//        fillForm(ret);
//    }
    return ret;
}


//function disconnect() {
//    clearForm();
//    var CVR_IDCard = document.getElementById("plugin");
//    var ret = CVR_IDCard.disconnect();
//    ret = JStrToObj(ret);
//    DisplayInfo(ret);
//    return;
//}
//
//function ReadIDCard() {
//    var CVR_IDCard = document.getElementById("plugin");
//    var ret = JStrToObj(CVR_IDCard.connect());
//
//    if (ret.resultFlag==-1){
//        // clearForm();
//        DisplayInfo(ret);
//        return;
//    }
//
//    ret = JStrToObj(CVR_IDCard.readCert());
//    if (ret.resultFlag==-1){
//        // clearForm();
//        DisplayInfo(ret);
//    }else{
//        fillForm(ret);
//    }
//
//    ret = JStrToObj(CVR_IDCard.disconnect());
//    if (ret.resultFlag==-1){
//        DisplayInfo(ret);
//        return;
//    }
//
//
//}
//
function JStrToObj(str){
    return eval("(" + str + ")");
}

//function DisplayInfo(ret){
//    if (ret.resultFlag==0){
//        document.all['errorMsg'].style.color = 'Green';
//    }else{
//        document.all['errorMsg'].style.color = 'Red';
//    }
//
//    document.all['resultFlag'].innerHTML = ret.resultFlag;
//    document.all['errorMsg'].innerHTML = ret.errorMsg;
//
//    if (ret.status!=null)
//        document.all['status'].innerHTML = ret.status
//    else
//        document.all['status'].innerHTML = "";
//
//}
//
//
//function fillForm(ret) {
//    // DisplayInfo(ret);
//    var pName=ret.resultContent.partyName;
//    var pSex=ret.resultContent.gender;
//    var pNation=ret.resultContent.nation;
//    var pBorn=ret.resultContent.bornDay .replace(/^(\d{4})(\d{2})(\d{2})$/, "$1年$2月$3日");//变换日期显示
//    var pAddress=ret.resultContent.certAddress;
//    var pCardNo=ret.resultContent.certNumber;
//    // var pPolice=ret.resultContent.certOrg;
//    // var pActivityLFrom=ret.resultContent.effDate;
//    // var pActivityLTo=ret.resultContent.expDate;
//    if (ret.resultContent.gender==1) {
//        document.all['mName'].value = pName;
//        if (ret.resultContent.gender==1) {
//            pSex = '男'
//        }
//        else if (ret.resultContent.gender==0)
//        { pSex='女'};//判断男女
//        document.all['mSex'].value = pSex;
//        document.all['mNation'].value = pNation;
//        document.all['mBorn'].value = pBorn;
//        document.all['mAddress'].value = pAddress;
//        document.all['mCardNo'].value = pCardNo;
//        // document.all['mPolice'].value = pPolice;
//        // document.all['mActivityLFrom'].value = pActivityLFrom;
//        // document.all['mActivityLTo'].value = pActivityLTo;
//        document.all['mBase64Jpg0Display'].src = "data:image/jpg;base64," + ret.resultContent.cardHimg;
//        // document.all['Base64Jpg1Display'].src = "data:image/jpg;base64," + ret.resultContent.cardFimg;
//        // document.all['Base64Jpg2Display'].src = "data:image/jpg;base64," + ret.resultContent.cardBimg;
//        // document.all['Base64Jpg3Display'].src = "data:image/jpg;base64," + ret.resultContent.cardAimg;
//    }//男生信息填充
//    else if (ret.resultContent.gender==0)
//    {
//        document.all['wName'].value = pName;
//        if (ret.resultContent.gender==1) {
//            pSex = '男'
//        }
//        else if (ret.resultContent.gender==0)
//        { pSex='女'};//判断男女
//        document.all['wSex'].value = pSex;
//        document.all['wNation'].value = pNation;
//        document.all['wBorn'].value = pBorn;
//        document.all['wAddress'].value = pAddress;
//        document.all['wCardNo'].value = pCardNo;
//        // document.all['wPolice'].value = pPolice;
//        // document.all['wActivityLFrom'].value = pActivityLFrom;
//        // document.all['wActivityLTo'].value = pActivityLTo;
//        document.all['wBase64Jpg0Display'].src = "data:image/jpg;base64," + ret.resultContent.cardHimg;
//        // document.all['Base64Jpg1Display'].src = "data:image/jpg;base64," + ret.resultContent.cardFimg;
//        // document.all['Base64Jpg2Display'].src = "data:image/jpg;base64," + ret.resultContent.cardBimg;
//        // document.all['Base64Jpg3Display'].src = "data:image/jpg;base64," + ret.resultContent.cardAimg;
//    };//
//
//
//
//    // document.all['resultFlag'].innerHTML = ret.resultFlag;
//    document.all['errorMsg'].innerHTML = ret.errorMsg;
//    if (ret.status!=null)
//        document.all['status'].innerHTML = ret.status
//    else
//        document.all['status'].innerHTML = "";
//
//
//
//}

//function clearForm() {
//    document.all['wName'].value = '';
//    document.all['wSex'].value = '';
//    document.all['wNation'].value = '';
//    document.all['wBorn'].value = '';
//    document.all['wAddress'].value = '';
//    document.all['wCardNo'].value = '';
//    // document.all['wPolice'].value = '';
//    // document.all['wActivityLFrom'].value = '';
//    // document.all['wActivityLTo'].value = '';
//
//
//    // document.all['wret'].innerHTML = '';
//
//    document.all['wBase64Jpg0Display'].src = "";
//    // document.all['wBase64Jpg1Display'].src = "";
//    // document.all['wBase64Jpg2Display'].src = "";
//    // document.all['wBase64Jpg3Display'].src = "";
//
//
//
//
//    document.all['mName'].value = '';
//    document.all['mSex'].value = '';
//    document.all['mNation'].value = '';
//    document.all['mBorn'].value = '';
//    document.all['mAddress'].value = '';
//    document.all['mCardNo'].value = '';
//    // document.all['mPolice'].value = '';
//    // document.all['mActivityLFrom'].value = '';
//    // document.all['mActivityLTo'].value = '';
//
//
//    // document.all['mret'].innerHTML = '';
//
//    document.all['mBase64Jpg0Display'].src = "";
//    // document.all['mBase64Jpg1Display'].src = "";
//    // document.all['mBase64Jpg2Display'].src = "";
//    // document.all['mBase64Jpg3Display'].src = "";
//
//
//    document.all['resultFlag'].innerHTML = '';
//    document.all['errorMsg'].innerHTML = '';
//    document.all['status'].innerHTML = '';
//}

//    function contReadCard(){
//        ReadIDCard();
//        timer =setTimeout("contReadCard()",1000);
//    }
//    function stopReadCard()
//    {
//        clearInterval(timer);
//        closeReader();
//    }

//    function ceshi ()
//    {
//        alert('测试成功');
//    }
//
//
//    function doword () {
//        alert('打开膜拜');
//    }

//
// 打开

//    function openmydoc(path)
//
//    {
//        var doc=new ActiveXObject("Word.Application");
//        doc.visible=true;
//        doc.Documents.Open(path);
//    }



//    function OpenFile()
//    {
//        if (document.getElementById("flUpload").value.toUpperCase().indexOf(".XLS") != -1)
//        {
//            var objExcel;
//            objExcel = new ActiveXObject("Excel.Application");
//            objExcel.Visible = true;
//            objExcel.Workbooks.Open(document.getElementById("flUpload").value);
//        }
//        else if (document.getElementById("flUpload").value.toUpperCase().indexOf(".DOC") != -1)
//        {
//            var objDoc;
//            objDoc = new ActiveXObject("Word.Application");
//            objDoc.Visible = true;
//            objDoc.Documents.Open(document.getElementById("fileUpload").value);
//        }
//        else
//        {
//            alert("Please select Word/Excel file only");
//            return false;
//        }
//    }
