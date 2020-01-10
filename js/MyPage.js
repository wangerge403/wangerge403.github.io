P = new Page();

function Page() {
    this.config = {
        elemId: '#page',
        pageIndex: '1',
        total: '0',
        pageNum: '3',
        pageSize: '10'
    };
    this.version = '1.0';
    this.requestFunction = null;
    this.initMathod = function (obj) {
        $.extend(this.config, obj.params);
        this.requestFunction = obj.requestFunction;
        this.renderPage();
    };
    this.renderPage = function () {
        this.requestFunction();
        this.pageHtml();
        $(P.config.elemId).on('click', 'a', function () {
            var flag = $(this).parent().hasClass('disabled');
            if (flag) {
                return false;
            }
            var pageIndex = $(this).data('pageindex');
            P.config.pageIndex = pageIndex;
            P.requestFunction();
            P.pageHtml();
        });
    };
    this.pageHtml = function () {
        var data = this.config;
        if (parseInt(data.total) <= 0) {
            return false;
        }
        var elemId = data.elemId;
        var pageNum = isBlank(data.pageNum) ? 7 : parseInt(data.pageNum);
        var pageSize = isBlank(data.pageSize) ? 10 : parseInt(data.pageSize);
        var total = parseInt(data.total);
        var pageTotal = total % pageSize != 0 ? parseInt(total / pageSize) + 1 : parseInt(total / pageSize);
        var pageIndex = pageTotal < parseInt(data.pageIndex) ? pageTotal : parseInt(data.pageIndex);
        var j = pageTotal < pageNum ? pageTotal : pageNum;
        var k = pageIndex < parseInt((j / 2) + 1) ? -1 * (pageIndex - 1) : pageIndex > (pageTotal - parseInt(j / 2)) ? -1 * (j - (pageTotal - pageIndex) - 1) : -1 * parseInt((j / 2));
        var pageHtml = '<ul>';
        if (pageIndex <= 0 || pageIndex == 1) {
            pageHtml += '<li class="disabled"><a href="javascript:;" data-pageindex="' + pageIndex + '">首页</a></li>' +
                '<li class="disabled"><a href="javascript:;" data-pageindex="' + pageIndex + '">上一页</a></li>';
        } else {
            pageHtml += '<li><a href="javascript:;" data-pageindex="1">首页</a></li>' +
                '<li><a href="javascript:;" data-pageindex="' + (pageIndex - 1) + '">上一页</a></li>';
        }
        for (var i = k; i < (k + j); i++) {
            if (pageTotal == (pageIndex + i - 1)) break;
            if (i == 0) {
                pageHtml += '<li class="active"><a href="javascript:;" data-pageindex="' + pageIndex + '">' + pageIndex + '</a></li>';
            } else {
                pageHtml += '<li><a href="javascript:;" data-pageindex="' + (pageIndex + i) + '">' + (pageIndex + i) + '</a></li>';
            }
        }
        if (pageTotal == 1 || pageTotal <= pageIndex) {
            pageHtml += '<li class="disabled"><a href="javascript:;" data-pageindex="' + pageTotal + '">下一页</a></li>' +
                '<li class="disabled"><a href="javascript:;" data-pageindex="' + pageTotal + '">末页</a></li>';
        } else {
            pageHtml += '<li><a href="javascript:;" data-pageindex="' + (pageIndex + 1) + '">下一页</a></li>' +
                '<li><a href="javascript:;" data-pageindex="' + pageTotal + '">末页</a></li>';
        }
        pageHtml += '</ul>'
        $(elemId).html('');
        $(elemId).html(pageHtml);
    };
}

function isBlank(str) {
    if (str == undefined || str == null || str.trim() == '') {
        return true;
    }
    return false;
}