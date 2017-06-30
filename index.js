

var SubmitByIframe = function(options) {
    this.init(options);
}

SubmitByIframe.prototype = {

    init: function(options) {
        this._setOptions(options); 
        this.createIframe();
        this.createForm();
        this.submit();
    },
    createIframe : function(){
        var self = this;

        if ($(self.options.iframeName).length == 0) {
            var iframeStr = '<iframe id="' + self.options.iframeName + '" name="' + self.options.iframeName + '"  style="display:none"></iframe>';
            $('body').append(iframeStr);
        }
        self.$iframe = $(self.options.iframeId);
    },

    createForm : function(){
        var self = this;

        if ($(self.options.iframeName).length == 0) {
            var formStr = '<form id="'+ self.options.form +'" method="'+ self.options.type +'" target="'+ self.options.iframeName +'"> </form>'        
            $('body').append(formStr);
        }
        self.$form = $(self.options.formId);
        self.$form.html(self.createInput());        
    },

    _setOptions : function(options){
        this.options = {
            url: "", 
            blankUrl: 'blank.html',
            formId: '#login_form',
            form: 'login_form',
            type: 'POST',
            iframeId: '#login_iframe',
            iframeName: 'login_iframe', 
        };
        return $.extend(this.options,options || {});

    },    

    createInput: function() {
        var inputStr = "", data = this.options.data;
        for (var key in data) {
             inputStr += '<input name="'+key+'" value="'+data[key]+'" type="hidden"></input>';
        }       

        return inputStr;
    },
    bindSubmit: function() {
        var self = this;
        self.$iframe.unbind('load').unbind('errorupdate');
        self.$iframe.on('load', function() {

            try{

                var res = self.$iframe.prop('contentWindow').response;


                if(res){
                    if($.isFunction(self.options.success)){
                        self.options.success(res);
                    }
                    return;
                }

                if($.isFunction(self.options.error)){
                    self.options.error(res);
                }

            }catch(err){
                 self.error && self.error({});
            }
        })
        .on('errorupdate', function() {
                if($.isFunction(self.options.error)){
                    self.options.error({msg:"error"});
                }
        });
    },

    submit: function() {
        this.bindSubmit();
        this.$form.attr('action', this.options.url).submit();
    }
};

SubmitByIframe.create = function(options) {

    var formSubmit = new SubmitByIframe(options);
};

module.exports = SubmitByIframe;

