
var SubmitByIframe = function(options) {

    this.options = options;
    this.url = options.url;
    this.blankUrl = options.blankUrl || 'blank.html';
    this.type = options.type || 'POST';
    this.formId = options.formId;
    this.form = options.form;
    this.iframeId = options.iframeId || 'hidden_iframe';
    this.iframeName = options.iframeName || 'hidden_iframe';
    this.success = options.success;
    this.error = options.error;

}

SubmitByIframe.prototype = {
    init: function() {
        var self = this;
        var iframeStr = '<iframe id="' + self.iframeName + '" name="' + self.iframeName + '" src="' + self.blankUrl + '" style="display:none"></iframe>';
    	var formStr = '<form id="'+ self.form +'" method="'+ self.type +'" target="'+ self.iframeName +'"> </form>'        
        $('body').append(iframeStr);
        $('body').append(formStr);
        self.$form = $(self.formId);
        self.$iframe = $(self.iframeId);
        self.$form.html(self.createInput());

    },

	createInput: function(data) {
		var inputStr = "";
		for (var key in data) {
			 inputStr += '<input name="'+key+'" value="'+data[key]+'" type="hidden"></input>';
		}		

		return inputStr;
	},

    getUrlValue: function(str){
        if (str.search(/#/)>0){
            str = str.slice(0,str.search(/#/));
        }
        var obj = {};
        if (str.search(/\?/)<0){
            return obj;
        }
        var arr = str.slice(str.search(/\?/)+1).split('&');
        for(var i=0,j=arr.length; i<j; i++){
            var tmp = arr[i].split('=');
            obj[tmp[0]] = tmp[1];
        }
        return obj;
    },

    bindSubmit: function() {
        var self = this;
        self.$iframe.unbind('load').unbind('errorupdate');
        self.$iframe.on('load', function() {
        	console.log(1111)
            try{
                var res = self.getUrlValue(self.$iframe.prop('contentWindow').location.href);
                if(res) {
                    self.success && self.success(res);
                } else {
                    self.error && self.error();
                }
            }catch(err){
                self.error && self.error();
            }
        })
        .on('errorupdate', self.iframeId, function() {
            self.error && self.error();
        });
    },

    submit: function() {
        this.bindSubmit();
        this.$form.attr('action', this.url).submit();
    },

    render: function() {
        this.init();
    }
};

SubmitByIframe.create = function(options) {
    var formSubmit = new SubmitByIframe(options);
    formSubmit.render();
    formSubmit.submit()
};

module.exports = SubmitByIframe;