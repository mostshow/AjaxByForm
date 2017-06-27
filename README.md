# AjaxByForm
[![npm](https://img.shields.io/badge/npm-v0.1.1-blue.svg)](https://www.npmjs.com/package/log-reporter)

```

## Usage

```javascript

	ajaxForm.create({
	    url: "",
	    blankUrl: 'blank.html',
	    formId: '#login_form',
	    form: 'login_form',
	    type: 'POST',
	    iframeId: '#login_iframe',
	    iframeName: 'login_iframe',
	    success: function(res) {
	        console.log(res);
	    },
	    error: function() {
	        alert('error');
	    }
	});	

```





