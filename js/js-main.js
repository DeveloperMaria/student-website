//onhover tabs showing mega menu
$(function(){
  var hash = window.location.hash;
  hash && $('.mega-menu ul.nav a[href="' + hash + '"]').tab('show');

  $('.mega-menu .nav-tabs a').hover(function (e) {
    $(this).tab('show');
    var scrollmem = $('body').scrollTop();
    window.location.hash = this.hash;
    $('html,body').scrollTop(scrollmem);
  });
});

//megamenu js
jQuery(document).ready(function ($) {
    getexperts();
    getReviewForFooter();
  $('#datetimepicker4').datetimepicker();
  $('#pills-tab[data-mouse="hover"] a').hover(function(){
        $(this).tab('show');
  });
  $('a[data-toggle="pill"]').on('shown.bs.tab', function (e) {
    var target = $(e.relatedTarget).attr('href');
    $(target).removeClass('active');
  });
  
});

function page(type){
    if ($(".pages").val() != 'NWL') {
        var pageno = parseInt($(".pages").val());
    } else {
        var pageno = 1;
        $('#no_word_limit').prop("checked", false);
    }
    if(type=='add'){
        pageno++;
    }else if(type=='minus' && pageno>1){
        pageno--;
    }
    var words = pageno*250;
    $(".pages").val(pageno);
    $(".words").text(words+' Words');
}
$('#no_word_limit').change(function () {
    if ($(this).prop("checked") == true) {
        $('.pages').val('NWL');
        $('.words').text('No Limit');
    } else {
        $('.pages').val(1);
        $('.words').html('250 Words');
    }
});

$('#contact_form').submit(function () {
        event.preventDefault();
    	var data = new FormData($("#contact_form")[0]);
    	$.ajax({
    	    url: 'home/contact_enquiry',
    	    method: 'post',
    	    data: data,
    	    processData: false,
    	    contentType: false,
    	    beforeSend:function(){
    	       $(".alert").removeClass('alert-success').addClass('alert-warning').text('Please wait....'); 
    	    },
    	    success: function (response) {
        		var obj = JSON.parse(response);
        		if (obj.status === 1) {
        		    $('#contact_form')[0].reset();
        		    $(".alert").removeClass('alert-warning').addClass('alert-success').text(obj.message);
        		} else {
        		    $(".alert").removeClass('alert-success').addClass('alert-warning').text(obj.message);
        		}
    	    }
    	});
    });


$('.refreshCaptcha').click(function(){
    refreshCaptch();
});
$('#datetimepicker4').datetimepicker();
$('.orderAttachments').change(function() {
    formdata = new FormData();
    var path = "uploads/orders/";
    if ($(this).prop('files').length > 0) {
        file = $(this).prop('files')[0];
        formdata.append("file", file);
        formdata.append("path", path);
        $(".orderAttachments").val('');
        uploadDocs(formdata, 'UploadedDoc', 'order_attachments');
    }
});
$('#placeOrder').click(function () {
    	var data = new FormData($("#orderForm")[0]);
    	$.ajax({
    	    url: base_url+'home/PlaceOrder',
    	    method: 'post',
    	    data: data,
    	    processData: false,
    	    contentType: false,
    	    beforeSend:function(){
    	       $(".alert").removeClass('alert-success').addClass('alert-warning').text('Please wait....'); 
    	    },
    	    success: function (response) {
        		var obj = JSON.parse(response);
        		if (obj.status === 1) {
        		    $('#orderForm')[0].reset();
        		    refreshCaptch();
        		    $(".alert").removeClass('alert-warning').addClass('alert-success').text(obj.message);
        		} else {
        		    $(".alert").removeClass('alert-success').addClass('alert-warning').text(obj.message);
        		}
    	    }
    	});
    });

function uploadDocs(formdata, targetId, hiddenele) {
	$("#" + targetId)
		.next()
		.find(".progress-bar")
		.css("width", "0%");
	$("#" + targetId)
		.next()
		.show();
	$.ajax({
		url: base_url + "administrator/Common_upload/DocsUploadOrder",
		type: "POST",
		data: formdata,
		contentType: false,
		async: true,
		cache: false,
		processData: false,
		xhr: function () {
			var xhr = new window.XMLHttpRequest();
			xhr.upload.addEventListener(
				"progress",
				function (evt) {
					if (evt.lengthComputable) {
						var percentComplete = evt.loaded / evt.total;
						percentComplete = parseInt(percentComplete * 100);
						$("#" + targetId)
							.next()
							.find(".progress-bar")
							.text(percentComplete + "%");
						$("#" + targetId)
							.next()
							.find(".progress-bar")
							.css("width", percentComplete + "%");
						if (percentComplete == "100") {
						}
					}
				},
				false
			);
			return xhr;
		},
		success: function (data) {
			var data = JSON.parse(data);
			if (data.status == "success") {
				$("#" + targetId + "").append(data.uploadedFile);
				setTimeout(function () {
				    var uploaded = $("." + hiddenele + "").val();
				    var removeid = data.remove_id;
					var uploadedfile = data.finalfile;
					console.log(uploaded);
					if(uploaded=='' ){
					    $("." + hiddenele + "").addClass(removeid);
					    $("." + hiddenele + "").val(uploadedfile);
					}else{
					    var html = '<input type="hidden" id="order_attachments"  class="order_attachments '+removeid+'" value="'+uploadedfile+'" name="attachment_name[]">';
					    $(".uploadDiv").append(html);
					}
					$("#" + targetId)
						.next()
						.hide();
					$("#" + targetId)
						.next()
						.find(".progress-bar")
						.css("width", "0%");
				}, 1000);
			} else {
				$("#" + targetId)
					.next()
					.hide();
				$("#" + targetId)
					.next()
					.find(".progress-bar")
					.css("width", "0%");
				$("#" + targetId + "").html(data.msg);
				$("#" + targetId + "").css("color", "red");
			}
		},
		error: function () {},
	});
}
function refreshCaptch(){
    var url = base_url+'home/refreshCaptcha';
    var data = {};
    $.ajax({
        url: url,
        type: 'POST',
        enctype: 'multipart/form-data',
        processData: false, // Important!
        contentType: false,
        cache: false,
        data: data,
        success: function (res) {
            var res = JSON.parse(res);
            if(res.error==1){
                errmsg = " Something went wrong, Please try again later.";
                alert(errmsg);
            }
            else{
                $('.captImg').html(res.captchaCode);
            }
        },
        error: function (e) {
        }
    });
}

function getReviewForFooter(){
    var url = base_url+'home/getReviewForFooter';
    var data = {};
    $.ajax({
        url: url,
        type: 'POST',
        enctype: 'multipart/form-data',
        processData: false, // Important!
        contentType: false,
        cache: false,
        data: data,
        success: function (res) {
            var res = JSON.parse(res);
            if(res.error==0){
                $(".average_review").text(res.avg_review+'/5');
            }
            else{
              console.log('something went wrong- getReviewForFooter')
            }
        },
        error: function (e) {
        }
    });
}
function getexperts(){
     var subject = $('#hidden_subject').val();
     var rating = $('#hidden_rating').val();
     var orderCompleted = $('#hidden_order_completed').val();
     var projectCompleted = $('#hidden_project_completed').val();
    $('#orderslist').DataTable({
        "responsive": true,
        "destroy": true,
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": base_url + "home/ajaxListing",
            "type": 'POST',
            data:{subject:subject,rating:rating,orderCompleted:orderCompleted,projectCompleted:projectCompleted}
        },
        "fnDrawCallback": function (oSettings) {
            if (oSettings._iDisplayLength > oSettings.fnRecordsDisplay()) {
                $(oSettings.nTableWrapper).find('.dataTables_paginate').hide();
            } else {
                $(oSettings.nTableWrapper).find('.dataTables_paginate').show();
            }
        }
    });   
}
$(document).on('click',".fileCloseBtn",function(){
    var id = $(this).attr('removeid');
    $("."+id).remove();
    $(this).closest('li').remove();
});
$("#subject,#rating,#orderCompleted,#projectCompleted").on('change', function () {
            var subject = $('#subject').val();
            var rating = $('#rating').val();
            var orderCompleted = $('#orderCompleted').val();
            var projectCompleted = $('#projectCompleted').val();
            $('#hidden_subject').val(subject);
            $('#hidden_rating').val(rating);
            $('#hidden_order_completed').val(orderCompleted);
            $('#hidden_project_completed').val(projectCompleted);
            getexperts();
});

function requestfreequote(){
    var data = new FormData($("#request_free_quote")[0]);
    $.ajax({
    	    url: base_url+'home/PlaceOrder',
    	    method: 'post',
    	    data: data,
    	    processData: false,
    	    contentType: false,
    	    beforeSend:function(){
    	       $(".alert").removeClass('alert-success').addClass('alert-warning').text('Please wait....'); 
    	    },
    	    success: function (response) {
        		var obj = JSON.parse(response);
        		if (obj.status === 1) {
        		    $('#request_free_quote')[0].reset();
        		    refreshCaptch();
        		    $(".alert").removeClass('alert-warning').addClass('alert-success').text(obj.message);
        		} else {
        		    $(".alert").removeClass('alert-success').addClass('alert-warning').text(obj.message);
        		}
    	    }
    	});
}
   function requestcallback(){
    var data = new FormData($("#call_back_request")[0]);
    $.ajax({
    	    url: base_url+'home/callback_request',
    	    method: 'post',
    	    data: data,
    	    processData: false,
    	    contentType: false,
    	    beforeSend:function(){
    	       $(".alert1").removeClass('alert-success').addClass('alert-warning').text('Please wait....'); 
    	    },
    	    success: function (response) {
        		var obj = JSON.parse(response);
        		if (obj.status === 1) {
        		    $('#call_back_request')[0].reset();
        		    refreshCaptch();
        		    $(".alert1").removeClass('alert-warning').addClass('alert-success').text(obj.message);
        		} else {
        		    $(".alert1").removeClass('alert-success').addClass('alert-warning').text(obj.message);
        		}
    	    }
    	});
  } 
  function submitRegistration() {
        event.preventDefault();
        var url = base_url+'dashboard/student_registration';
		var data = $("#register_form").serialize();
		$.ajax({
        type: "POST",
        url: url,
        data: data,
        success: function(data){
            result = JSON.parse(data);
            if (result.status === 1) {
                $('#register_form').each(function () {
    				this.reset();
    			    });
                $("#result").removeClass("alert alert-danger");
                $("#result").html(result.message);
                $("#result").addClass("alert alert-success");
                setTimeout(function(){
                    window.location.reload(1);
                }, 2000);
            }else{
                $("#result").html(result.message);
                $("#result").addClass("alert alert-danger");
                 $(".resetSubmit").removeAttr("disabled");
            }
        }
    });
	   
	}
	function submitLogin() {
        event.preventDefault();
        var url = base_url+'dashboard/student_login';
		var data = $("#student_login").serialize();
		$.ajax({
        type: "POST",
        url: url,
        data: data,
        success: function(data){
            result = JSON.parse(data);
            if (result.status === 1) {
                $('#student_login').each(function () {
    				this.reset();
    			    });
                $("#result_login").removeClass("alert alert-danger");
                $("#result_login").html(result.message);
                var r_url = base_url+result.data;
                window.location = r_url;
            }else{
                $("#result_login").html(result.message);
                $("#result_login").addClass("alert alert-danger");
                $(".resetSubmit").removeAttr("disabled");
            }
        }
    });
	   
	}
	
	function submitForgotpassword(){
	    event.preventDefault();
        var url = base_url+'dashboard/student_forgetpassword';
    	var data = $("#student_forgotpassword").serialize();
    	$.ajax({
            type: "POST",
            url: url,
            data: data,
            success: function(data){
                result = JSON.parse(data);
                if (result.status === 1) {
                    $('#student_forgotpassword').each(function () {
        				this.reset();
        			    });
                    $("#result_f").removeClass("alert alert-danger");
                    $("#result_f").html(result.message);
                    $("#result_f").addClass("alert alert-success");
                    setTimeout(function(){
                        window.location.reload(1);
                    }, 2000);
                }else{
                    $("#result_f").html(result.message);
                    $("#result_f").addClass("alert alert-danger");
                    $(".resetSubmit").removeAttr("disabled");
                }
            }
        });
	} 