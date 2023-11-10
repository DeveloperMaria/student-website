$(document).ready(function() {
    $.validator.addMethod("lettersOnly", function(value, element) {
        return this.optional(element) || /^[a-zA-Z\s']+$/i.test(value);
     }, "Please Enter Only letters and Spaces, Special symbols are not allowed");
    $.validator.addMethod("urlOnly", function(value, element) {
        var field = new RegExp("^(https?://)?(www\\.)?([-a-z0-9]{1,63}\\.)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\\.[a-z]{2,6}(/[-\\w@\\+\\.~#\\?&/=%]*)?$","i");
        return this.optional(element) || field.test(value);
     }, "Please Enter valid Url");
     $.validator.addMethod(
        "phoneOnly", function(value,element){
        //var phoneRegExp = /^(\+97[\s]{0,1}[\-]{0,1}[\s]{0,1}1|0)50[\s]{0,1}[\-()]{0,1}[\s]{0,1}[1-9]{1}[0-9]{6}$/;
        var phoneRegExp = /^[0-9-+() ]*$/;
        var phoneVal = value;
        var numbers = phoneVal.split("").length;
        if ((10 <= numbers && numbers <= 32 && phoneRegExp.test(phoneVal)) || element.value == element.alt || element.value == "") {
            return true;
        }else{
            return false;
        }
        },"Please Enter A Valid 10 Digit Phone Number");

    $('#userForm').validate({
        rules: {
            first_name: {  required: true },
            email_id: {  required: true },
            user_type : { required: true },
            password : { required: { depends: function(element) {
                var id = $("#edit_id").val();
                if(id =='')
                {
                    return true;
                }
                }}},
            confirm_password : { required: { depends: function(element) {
                var id = $("#edit_id").val();
                if(id =='')
                {
                    return true;
                }
                }}}
            
        },
        messages:{
            first_name: {required:"Please Enter First Name"},
            email_id: {required:"Please Enter Email Address"},
            user_type: {required:"Please Select Role"},
            password: {required:"Please Enter Password"},
            confirm_password: {required:"Please Enter Confirm Password"}
          
        },
        submitHandler: function(form){
        $("#userForm .resetSubmit").attr("disabled", true);
            form.submit();
            $("#userForm")[0].reset();
        },
    });
     
    $('#profileForm').validate({
        rules: {
            first_name: {  required: true }
        },
        messages:{
            first_name: {required:"Please Enter First Name"},
          
        },
        submitHandler: function(form){
        $("#profileForm .resetSubmit").attr("disabled", true);
            form.submit();
            $("#profileForm")[0].reset();
        },
    });

    $('#passwordForm').validate({
        rules: {
            current_password: {  required: true },
            new_password: {  required: true },
            retype_password: {  required: true }
        },
        messages:{
            current_password: {required:"Please Enter Current Password"},
            new_password: {required:"Please Enter New Password"},
            retype_password: {required:"Please Enter Confirm Password"},
          
        },
        submitHandler: function(form){
        $("#passwordForm .resetSubmit").attr("disabled", true);
            form.submit();
            $("#passwordForm")[0].reset();
        },
    });

    $('#genealSettingForm').validate({
        rules: {
            email: {  required: true },
            contact_no: {  required: true,phoneOnly:true },
            address: {  required: true },
            address_ar: {  required: true },
            time_line: {  required: true },
            time_line_ar: {  required: true },
            theme_color: { required: true },
            footer_text: { required: true },
            footer_text_ar: { required: true },
            google_api_key: {required: true},
            google_place_id: {required: true},
            google_customer_id: {required: true},
        },
        messages:{
            email: {required:"Please Enter Email Address"},
            contact_no: {required:"Please Enter Contact No"},
            address: {required:"Please Enter Address"},
            address_ar: {  required:"Please Enter Arabic Address" },
            time_line: {  required: "Please Enter Timings" },
            time_line_ar: {  required: "Please Enter Arabic Timings" },
            theme_color: { required: "Please Enter Theme Color" },
            footer_text: { required: "Please Enter Footer Text" },
            footer_text_ar: { required: "Please Enter Arabic Footer Text" },
            google_api_key: {required: "Please Enter Google API Key"},
            google_place_id: {required: "Please Enter Google Place Id"},
            google_customer_id: {required: "Please Enter Google Customer Id"},
        },
        submitHandler: function(form){
            $("#genealSettingForm .resetSubmit").attr("disabled", true);
            form.submit();
            $("#genealSettingForm")[0].reset();
        },
    });

    $('#menusForm').validate({
        rules: {
            menu_title : { required:true,lettersOnly:true},
            menu_title_ar : { required:true},
            external_link   : { required:{ depends: function(element) {
                                var type = $(".page_type:checked").val();
                                if(type=="external_page")
                                {
                                    return true;
                                }
                                }},urlOnly:true},
            dynamic_page_id   :{ required:{ depends: function(element) {
                                var type = $(".page_type:checked").val();
                                if(type=="dynamic_page")
                                {
                                    return true;
                                }
                                }}},
        },
        messages:{
            menu_title   : { required : "Please Enter Menu Title"},
            menu_title_ar   : { required : "Please Enter Arabic Menu Title"},
            external_link   : { required:"Please Enter External Link"}, 
            dynamic_page_id   : { required:"Please Select Dynamic Page"}, 
        },
        submitHandler: function(form){
            $("#menusForm .resetSubmit").attr("disabled", true);
                form.submit();
                $("#menusForm")[0].reset();
            },
    }); 

    $('#slidersForm').validate({
        rules: {
            "icon_up[]" : {required: true},
            "icon[]": { required: true},
            "image_up[]" : {  required: true },
            "image[]" : {  required: true },
            "heading_up[]" : {  required: true },
            "heading[]" : {  required: true },
            "heading_ar_up[]" : {  required: true },
            "heading_ar[]" : {  required: true },
            "status_up[]" : {  required: true },
            "status[]": {  required: true },
            "description_up[]": { required:true },
            "description[]"   : { required:true },
            "description_ar_up[]": { required:true },
            "description_ar[]"   : { required:true },
            "page_link_up[]"  : {url:true},
            "page_link[]" : {url:true}
        },
        messages:{
            "icon_up[]": {required: "Please Upload File"},
            "icon[]": { required: "Please Upload File"},
            "image_up[]" : {  required: "Please Upload File" },
            "image[]" : {  required: "Please Upload File" },
            "heading_up[]" : {  required: "Please Enter Slider Title" },
            "heading[]" : {  required: "Please Enter Slider Title" },
            "heading_ar_up[]" : {  required: "Please Arabic Enter Slider Title" },
            "heading_ar[]" : {  required: "Please Enter Arabic Slider Title" },
            "status_up[]" : {  required: "Please Select Status" },
            "status[]": {  required: "Please Select Status" },
            "description_up[]": { required:"Please Enter Slider Description" },
            "description[]"   : { required:"Please Enter Slider Desctiption" },
            "description_ar_up[]": { required:"Please Enter Arabic Slider Description" },
            "description_ar[]"   : { required:"Please Enter Arabic Slider Desctiption" },
        },
        submitHandler: function(form){
        $("#slidersForm .resetSubmit").attr("disabled", true);
            form.submit();
            $("#slidersForm")[0].reset();
        },
    });

    $("#loginForm").validate({
        rules: {
            username : {  required: true},
            password : {  required: true },
            captcha: {required: true}
        },
        messages:{
            username : {required:"Please Enter Username"},
            password : {  required: "Please Enter Password" },
            captcha: {required: "Please Enter Captcha"}
        },
        submitHandler: function(form){
        $("#loginForm .resetSubmit").attr("disabled", true);
            form.submit();
            $("#loginForm")[0].reset();
        },
    });

    $("#resetPassword").validate({
        rules: {
            username : {  required: true},
            security_token: { required: true},
            password : {  required: true },
            confirm_password : { required: true}
        },
        messages:{
            username : {required:"Please Enter Username"},
            security_token: { required: "Please Enter Security Token"},
            password : {  required: "Please Enter Password" },
            confirm_password : { required: "Please Enter Confirm Password"}
        },
        submitHandler: function(form){
        $("#resetPassword .resetSubmit").attr("disabled", true);
            form.submit();
            $("#resetPassword")[0].reset();
        },
    });

    $('#blockcontentForm').validate({
        rules: {
            "block_type_up[]" : {required: true},
            "block_type[]": { required: true},
            "button_required_up[]" : {  required: true },
            "button_required[]" : {  required: true },
            "status_up[]" : {  required: true },
            "status[]": {  required: true },
            "description_up[]": { required:true },
            "description[]"   : { required:true },
            "description_ar_up[]": { required:true },
            "description_ar[]"   : { required:true },
            
        },
        messages:{
            "block_type[]" : {required: "Please Select Block type"},
            "block_type[]": { required: "Please Select Block type"},
            "button_required_up[]" : {  required: "Please Select Button Required" },
            "button_required[]" : {  required: "Please Select Button Required" },
            "status_up[]" : {  required: "Please Select Status" },
            "status[]": {  required: "Please Select Status" },
            "description_up[]": { required:"Please Enter Description" },
            "description[]"   : { required:"Please Enter Desctiption" },
            "description_ar_up[]": { required:"Please Enter Arabic Description" },
            "description_ar[]"   : { required:"Please Enter Arabic Desctiption" },
        },
        submitHandler: function(form){
            blockcontent();
        },
    });
    $("#smtpSettingForm").validate({
        rules: {
            smtp_host: {  required: true},
            smtp_port: {  required: true},
            smtp_protocol: {  required: true,lettersOnly:true},
            smtp_name: {  required: true,lettersOnly:true},
            smtp_username : {  required: true},
            smtp_password : {  required: true }
        },
        messages:{
            smtp_host : {required:"Please Enter SMTP Host"},
            smtp_port : {required:"Please Enter SMTP Port"},
            smtp_protocol : {required:"Please Enter SMTP Protocol"},
            smtp_name : {required:"Please Enter SMTP Name"},
            smtp_username : {required:"Please Enter SMTP Username"},
            smtp_password : {required: "Please Enter SMTP Password"}
        },
        submitHandler: function(form){
        $("#smtpSettingForm .resetSubmit").attr("disabled", true);
            form.submit();
            $("#smtpSettingForm")[0].reset();
        },
    });

    $('#contactblocksForm').validate({
        rules: {
            heading: {  required: true },
            heading_ar: {  required: true },
            sub_heading: {  required: true },
            sub_heading_ar: {  required: true },
            image: {  required: true },
        }, 
        messages:{
            heading: {required:"Please Enter Heading"},
            heading_ar: {required:"Please Enter Arabic Heading"},
            sub_heading: {required:"Please Enter Sub Heading"},
            sub_heading_ar: {required:"Please Enter Arabic Sub Heading"},
            image: {  required: "Please upload image" },
        },
        submitHandler: function(form){
        $("#contactblocksForm .resetSubmit").attr("disabled", true);
            form.submit();
            $("#contactblocksForm")[0].reset();
        },
    });
    $("#requstAcallForm").validate({
        rules: {
            enquiry_request_id: {  required: true},
            enquiry_user_name: {  required: true,lettersOnly:true},
            enquiry_user_phone: {  required: true},
            enquiryCaptcha: {  required: true}
        },
        messages:{
            enquiry_request_id : {required:"Please Select Request Type"},
            enquiry_user_name : {required:"Please Enter Name"},
            enquiry_user_phone : {required:"Please Enter Phone"},
            enquiryCaptcha : {required:"Please Enter Captcha"}
        },
        submitHandler: function(form){
            $("#requstAcallForm .submitCallbackRequest").attr("disabled", true);
            submitEnquiry();
        },
    });

    $("#contactForm").validate({
        rules: {
            name    : {  required: true, lettersOnly:true},
            email   : {  required: true},
            phone   : {  required: true},
            subject : {  required: true},
            message : {  required: true},
            contactCaptcha : {  required: true},
        },
        messages:{
            name    : {  required: "Please Enter Name"},
            email   : {  required: "Please Enter Email"},
            phone   : {  required: "Please Enter Phone"},
            subject : {  required: "Please Enter Subject"},
            message : {  required: "Please Enter Message"},
            contactCaptcha: {  required: "Please Enter Captcha"}, 
        },
        submitHandler: function(form){
        $("#contactForm .resetButton").attr("disabled", true);
            submitContact();
        },
    });
    $("#downloadForm").validate({
        rules: {   
            email   : {  required: true},
            phone   : {  required: true},
            msdsCaptcha: {  required: { depends: function(element) {
                var dt = $("#dataType").val();
                if(dt =='MSDS'){
                    return true;
                }
            }}},
            serviceCaptcha: {  required: { depends: function(element) {
                var dt = $("#dataType").val();
                if(dt =='Service'){
                    return true;
                }
            }}},
        },
        messages:{
            email   : {  required: "Please Enter Email"},
            phone   : {  required: "Please Enter Phone"},
            msdsCaptcha   : {  required: "Please Enter Captcha"},
            serviceCaptcha   : {  required: "Please Enter Captcha"},
        }, 
        submitHandler: function(form){
            //$("#downloadForm .resetButton").attr("disabled", true);
            submitDownloadform();
        },
    });

    $('#socialMediaForm').validate({
        rules: {
            "link[]" : {  url: true },
        },
        submitHandler: function(form){
            $("#socialMediaForm .resetSubmit").attr("disabled", true);
            form.submit();
            $("#socialMediaForm")[0].reset();
        },
    });

    $('#ordersForm').validate({
        rules: {
            name                 : {  required: true },
            email                : {  required: true },
            subject_name         : {  required: true },
            deadline_date_time   : {  required: true },
        },
        messages:{
            name                 : {  required: "Please Enter Name" },
            email                : {  required: "Please Enter Email" },
            subject_name         : {  required: "Please Enter Subject Name" },
            deadline_date_time   : {  required: "Please Select Deadline Date time" },
        },
        submitHandler: function(form){
        $("#ordersForm .resetSubmit").attr("disabled", true);
            form.submit();
            $("#ordersForm")[0].reset();
        },
    });

    $('#ssubjectForm').validate({
        rules: {
            subject_name  : {  required: true },
        },
        messages:{
            subject_name  : {required:"Please Enter Subject Name"},
        },
        submitHandler: function(form){
        $("#subjectForm .resetSubmit").attr("disabled", true);
            form.submit();
            $("#subjectForm")[0].reset();
        },
    });

    $('#referenceForm').validate({
        rules: {
            reference_name  : {  required: true },
        },
        messages:{
            reference_name  : {required:"Please Enter Reference Name"},
        },
        submitHandler: function(form){
        $("#referenceForm .resetSubmit").attr("disabled", true);
            form.submit();
            $("#referenceForm")[0].reset();
        },
    });

    $('#servicecatForm').validate({
        rules: {
            service_category_name  : {  required: true },
            seo_url                : {  required: true },
            meta_title             : {  required: true },
            meta_description       : {  required: true },
            meta_keywords          : {  required: true },
        },
        messages:{
            service_category_name  : {  required: "Please Enter the Service Category Name" },
            seo_url                : {  required: "Please Enter SEO URL" },
            meta_title             : {  required: "Please Enter Meta Title" },
            meta_description       : {  required: "Please Enter Meta Description" },
            meta_keywords          : {  required: "Please Enter Meta Keywords" },
        },
        submitHandler: function(form){
        $("#servicecatForm .resetSubmit").attr("disabled", true);
            form.submit();
            $("#servicecatForm")[0].reset();
        },
    });

    $('#tagForm').validate({
        rules: {
            tag_name  : {  required: true },
        },
        messages:{
            tag_name  : {required:"Please Enter Tag Name"},
        },
        submitHandler: function(form){
        $("#tagForm .resetSubmit").attr("disabled", true);
            form.submit();
            $("#tagForm")[0].reset();
        },
    });

    $('#expertForm').validate({
        rules: {
            expert_name        : {  required: true },
            qualification      : {  required: true },
            current_job        : {  required: true },
            areas_of_interest  : {  required: true },
            average_rating     : {  required: true },
            assignments_solved : {  required: true },
            subjects           : {  required: true },
        },
        messages:{
            expert_name        : {  required: "Please Enter Expert Name" },
            qualification      : {  required: "Please Enter Qualification" },
            current_job        : {  required: "Please Enter Current Job" },
            areas_of_interest  : {  required: "Please Enter Areas Of Interest" },
            average_rating     : {  required: "Please Enter Average Rating" },
            assignments_solved : {  required: "Please Enter Assignments Solved" },
            subjects           : {  required: "Please Choose Subjects" },
        },
        submitHandler: function(form){
        $("#expertForm .resetSubmit").attr("disabled", true);
            form.submit();
            $("#expertForm")[0].reset();
        },
    });

    $('#expertsubjectForm').validate({
        rules: {
            expert_subject_name  : {  required: true },
        },
        messages:{
            expert_subject_name  : {required:"Please Enter Expert Subject Name"},
        },
        submitHandler: function(form){
        $("#expertsubjectForm .resetSubmit").attr("disabled", true);
            form.submit();
            $("#expertsubjectForm")[0].reset();
        },
    });

    $('#samplesForm').validate({
        rules: {
            sample_subjects_id  : {  required: true },
            title               : {  required: true },
            attachment_name     : {  required: true },
        },
        messages:{
            sample_subjects_id  : {required:"Please Select Subject"},
            title               : {required:"Please Enter Title"},
            attachment_name     : {required:"Please Choose Attachments"},
        },
        submitHandler: function(form){
        $("#samplesForm .resetSubmit").attr("disabled", true);
            form.submit();
            $("#samplesForm")[0].reset();
        },
    });

    $('#samplesubjectsForm').validate({
        rules: {
            sample_subject_name  : {  required: true },
            icon_image           : {  required: true },
            cover_image          : {  required: true },
            description          : {  required: true }
        },
        messages:{
            sample_subject_name   : {required:"Please Enter Popular Subject Name"},
            icon_image            : {required:"Please Choose Icon Image"},
            cover_image           : {required:"Please Choose cover Image"},
            description           : {required:"Please Enter Description" }
        },
        submitHandler: function(form){
        $("#samplesubjectsForm .resetSubmit").attr("disabled", true);
            form.submit();
            $("#samplesubjectsForm")[0].reset();
        },
    });

    $('#slidersForms').validate({
        rules: {
            title          : {  required: true },
            tag_line       : {  required: true },
            image          : {  required: true },
        },
        messages:{
            title           : {required:"Please Enter Title"},
            tag_line        : {required:"Please Enter Tag line"},
            image           : {required:"Please Enter Image"},
        },
        submitHandler: function(form){
        $("#slidersForm .resetSubmit").attr("disabled", true);
            form.submit();
            $("#slidersForm")[0].reset();
        },
    });

    $('#testimonialsForm').validate({
        rules: {
            name          : {  required: true },
            message       : {  required: true },
            profile_image : {  required: true },
        },
        messages:{
            name           : {required:"Please Enter Name"},
            message        : {required:"Please Enter Message"},
            profile_image  : {required:"Please Enter Profile Image"},
        },
        submitHandler: function(form){
        $("#testimonialsForm .resetSubmit").attr("disabled", true);
            form.submit();
            $("#testimonialsForm")[0].reset();
        },
    });

    $('#servicesForm').validate({
        rules: {
            service_categories_id  : {  required: true },
            menu_title             : {  required: true },
            page_title             : {  required: true },
            cover_image            : {  required: true },
            image                  : {  required: true },
            image_alt_text         : {  required: true },
            order_now_text         : {  required: true },
            seo_url                : {  required: true },
            meta_title             : {  required: true },
            meta_description       : {  required: true },
            meta_keywords          : {  required: true },

        },
        messages:{
            service_categories_id  : {required:"Please Enter Service Categories"},
            menu_title             : {required:"Please Enter Menu Title "},
            page_title             : {required:"Please Enter Page Title"},
            cover_image            : {required:"Please Choose Cover Image" },
            image_alt_text         : {required:"Please Enter Image Alt Text"},
            order_now_text         : {required:"Pleasse Enter Order now text"},
            seo_url                : {required: "Please Enter SEO Url" },
            meta_title             : {required: "Please Enter Meta Title" },
            meta_description       : {required: "Plese Enter Meta Description" },
            meta_keywords          : {required: "Please Enter Meta keywords" },

        },
        submitHandler: function(form){
        $("#servicesForm .resetSubmit").attr("disabled", true);
            form.submit();
            $("#servicesForm")[0].reset();
        },
    });

    $('#blogForm').validate({
        rules: {
            title       : {  required: true },
            description : {  required: true },
            "tags[]"    : {  required: true },
            image       : {  required: true },
            seo_url     : {  required: true },
            meta_title  : {  required: true },
            meta_description : {  required: true },
            meta_keywords    : {  required: true },
        },
        messages:{
            title        : {required:"Please Enter Title"},
            description  : {required:"Please Enter Description"},
            "tags[]"     : {required:"Please Enter Tags"},
            image        : {required: "Please Choose Image"},
            seo_url      : {  required: "Please Enter SEO Url" },
            meta_title   : {  required: "Please Enter Meta Title" },
            meta_description : {  required: "Plese Enter Meta Description" },
            meta_keywords    : {  required: "Please Enter Meta keywords" },
        },
        submitHandler: function(form){
        $("#blogForm .resetSubmit").attr("disabled", true);
            form.submit();
            $("#blogForm")[0].reset();
        },
    });

    $('#faqForm').validate({
        rules: {
            service_id: {  required: true },
            question: {  required: true },
            answer: {  required: true },
        },
        messages:{
            service_id: {required:"Please Select Service Name"},
            question: {required:"Please Enter Question"},
            answer: {required:"Please Enter Answer"},
        },
        submitHandler: function(form){
        $("#faqForm .resetSubmit").attr("disabled", true);
            form.submit();
            $("#faqForm")[0].reset();
        },
    });

    $('#reviewForm').validate({
        rules: {
            category_id: {  required: true },
            sub_category_id : { required : true },
            username : { required : true},
            review : { required : true},
            rating : { required : true},
            sequence : { required : true},
            question: {  required: true },
            review_date : { required: true}
        },
        messages:{
            category_id: {required:"Please Select Service Category"},
            sub_category_id : { required : "Please Select Service Name" },
            username : { required : "Please Enter Username"},
            review : { required : "Please Enter Review"},
            rating : { required : "Please Enter Rating"},
            question: {  required: "Please Enter the Question" },
            review_date : { required: "Please Select the Review Date"}
        },
        submitHandler: function(form){
        $("#reviewForm .resetSubmit").attr("disabled", true);
            form.submit();
            $("#reviewForm")[0].reset();
        },
    });
    
    $('#request_free_quote').validate({
        rules: {
            name: {  required: true },
            email : { required : true },
            subject : { required : true},
            deadline : { required : true},
            timezone : { required : true},
            captcha: {  required: true }
        },
        messages:{
            name: {  required: "Please Enter Name" },
            email : { required : "Please Enter Email" },
            subject : { required : "Please Enter Subject"},
            deadline : { required : "Please Enter Deadline"},
            timezone : { required : "Please Enter Timezone"},
            captcha: {  required: "Please Enter Captcha" }
        },
        submitHandler: function(form){
        $("#request_free_quote .resetSubmit").attr("disabled", true);
            requestfreequote();
            $("#request_free_quote")[0].reset();
        },
    });
    
    $('#call_back_request').validate({
        rules: {
            name: {  required: true },
            email : { required : true },
            phone : { required : true},
            message : { required : true },
            country_id : {required: true},
            timezone : { required : true},
            captcha: {  required: true }
        },
        messages:{
            name: {  required: "Please Enter Name" },
            email : { required : "Please Enter Email" },
            phone : { required : "Please Enter Subject"},
            country_id : {required: "Please Select country"},
            message : { required : "Please Enter Message" },
            timezone : { required : "Please Enter Timezone"},
            captcha: {  required: "Please Enter Captcha" }
        },
        submitHandler: function(form){
        $("#call_back_request .resetSubmit").attr("disabled", true);
            requestcallback();
            $("#call_back_request")[0].reset();
        },
    });
    
    $('#student_login').validate({
        rules: {
            useremail : { required : true },
            userpassword : { required : true}
        },
        messages:{
            useremail : { required : "Please Enter Email" },
            userpassword : { required : "Please Enter Password"}
        },
        submitHandler: function(form){
        $("#student_login .resetSubmit").attr("disabled", true);
            submitLogin();
            $("#student_login")[0].reset();
        },
    });
    $("#register_form").validate({
        rules: {
            name  : {  required: true},
            email : {  required: true },
            password : { required: true },
            confirm_password : { required: true },
        },
        messages:{
            name  :    { required:  "Please Enter Name" },
            email :    { required:  "Please Enter Email" },
            password  : { required : "Please Enter Password" },
            confirm_password : {  required: "Please Enter Confirm Password" },
        },
        submitHandler: function(form){
        $("#register_form .resetSubmit").attr("disabled", true);
            submitRegistration();
            $("#register_form")[0].reset();
        },
    });
    
    $("#student_forgotpassword").validate({
        rules: {
            email : {  required: true }
        },
        messages:{
            email :    { required:  "Please Enter Email" }
        },
        submitHandler: function(form){
        $("#student_forgotpassword .resetSubmit").attr("disabled", true);
            submitForgotpassword();
            $("#student_forgotpassword")[0].reset();
        },
    });
    
});    


