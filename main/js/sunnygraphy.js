var yestoslideAuto = (function(window){
    "use strict";
    

    var yestoslide_folder_name = "yestoslide_multi";

    var premium_user = false;
    //var used_big_image = true;
    //var big_image_size = "1920x1080"; //1920x1080 2880x1620
    var original_slide_only = true;
    var upload_image_and_insert_to_deck_at_once = true;
    var coordi_needed = false;
    var slides_empty = true;
    var quota_response ;
    var quotaBytesTotal =0;
    var quotaBytesUsed = 0;;
    var quotaBytesUsedAggregate = 0;
    var quotaBytesUsedInTrash = 0;
    var standalone_mode = false;
    var coordinator_email = "";
    var coordinator_profileImageUrl = "";
    var currently_controller = false;
    var is_client_login = false;
    var is_client = false;
    var current_presentation_explanation ="";
    var current_presentation_conference_name ="";
    var current_presentation_conference_id = "";
    var current_presentation_server_needed = "";
    var current_presentation_alarm_enalbed = false;
    var current_presentation_image_size = "default";
    var current_thumbId_for_sorting = "";
    var sorted_imgages_by_property =[];
    var current_buffering_iframe = "";
    var all_folders = [];
    var data_picture = "";
    var current_selfi_shared_folderid_v2="";
    var is_image = true;
    var perentage_upload = 0;
    var newly_uploaded_fileId = "";
    var newly_uploaded_fileName = "";
    var mp4blob = null;
    var current_present_desc = {};
    var ready_for_everything = false;
    var basic_info= {
        "current_search_header_for_fid" : "ID",
        "current_search_header_for_time" : "CreateTime",
        "current_search_header_for_comment" : "Comment",
        "current_header" : "ID,PresentationID,OriginID,OriginPresent,CreateTime,Comment,Email,Name,ProfileImage,orgImgUrl,thumbImgUrl,Kind",
        
        "current_header_history_presentations" : "PresentationID,OriginPresent,CreateTime,Altitude,Latitude,ConferenceName,ConferenceExplain,CoordiEmail,CoordiName,CoordiProfileImage",
        "current_header_history_messages" : "PresentationID,OriginPresent,SlideId,SlideId_Org,Comment,Kind",
        
    
        "apps_script_link_lecture" : "",
        "apps_script_link_for_history":"",
        "apps_script_link_for_sheets" : "",
        "apps_script_link_for_presentation" : "",
        "apps_script_link_for_presentation_thumb" : "",
        "apps_script_link_lecture_by_anyone" : "",
        "apps_script_link_for_email" :"",
        "current_spreadSheetId" :"",
        "current_sheet_name" :"",
        "current_spreadsheet_name" :"",
        
        'current_slides_id' : "",
        'current_slides_name' : "",
        'restored_slides_id' : "",
        'yestoslide_all_dataFolderId' : "",
        'yestoslide_database_FolderId' : "",
        'yestoslide_main_folder_id' :""
        
    }
    var apps_script_link_lecture = "https://script.google.com/macros/s/AKfycbyuYbGHiR4HbdrLT5Gz5I0RjidLTNypWyHTNsIbLHuyFqOXLmgHLJOJ4u6eU5QA7qif/exec";
    var apps_script_link_for_sheets = "";
    var apps_script_link_for_presentation = "";
    var apps_script_link_for_presentation_thumb = "";
    var apps_script_link_for_conference_backup ="";
    var conference_backup_folder = "";
    var apps_script_link_lecture_by_anyone = "";
    var apps_script_link_for_email = "";
    var apps_script_link_for_history ="";
    var presentation_image_template = "";
    var apps_script_link_for_slides_sheets = "";


    //https://docs.google.com/spreadsheets/d/1c_JcmWZLtkGBeOrHfuuIDsoFQlq7zh50m_U_UOze9nE/edit?usp=sharing
    var current_spreadSheetId = "";
    var current_sheet_name = "";
    var current_spreadsheet_name = "";
    var current_history_folderId = "";
    var current_invitation_folderId = "";
    var current_header = "ID,PresentationID,OriginID,OriginPresent,CreateTime,Comment,Email,Name,ProfileImage,orgImgUrl,thumbImgUrl,Kind" ;
    var current_header_history_presentations= "PresentationID,OriginPresent,CreateTime,Altitude,Latitude,ConferenceName,ConferenceExplain,CoordiEmail,CoordiName,CoordiProfileImage";
    var current_header_history_messages= "PresentationID,OriginPresent,SlideId,SlideId_Org,Comment,Kind";

    var current_search_header_for_fid = "ID";
    var current_search_header_for_time = "CreateTime";
    var current_search_header_for_comment = "Comment";


    var current_subfolder_in_sharing  ="";
    var current_slides_id = "";
    var current_orignial_slides_id = "";
    var current_slides_name = "";
    var restored_slides_id ="";
    var working_folder = "";
    var sharing_folder = "";
    var template_folder = "";
    var yestoslide_all_dataFolderId = "";
    var yestoslide_temporaryFolderId = "";
    var yestoslide_database_FolderId  ="";
    var yestoslide_main_folder_id ="";
    var current_conference_folderID = "";

    var coordinator_is_collecting = false;
    var enabled_for_newly_added_slide =false;

    var photoId_info = {
      is_mine: false,
      conference_id :"",
      conference_desc :""
    }
    

    function yestoslideAuto(){
         //MASTER CLASS
        
         console.log("created yestoslideAuto");
         
    }
    
    var main_iframe = null;
    yestoslideAuto.prototype.set_main_iframe = function(main_iframe_from_parent)
    {
      main_iframe = main_iframe_from_parent;
    }
 
    yestoslideAuto.prototype.set_current_conference_folderID = function(folderId){
      current_conference_folderID = folderId;
    }
    yestoslideAuto.prototype.get_current_conference_folderID = function(){
      return current_conference_folderID;
    }

    yestoslideAuto.prototype.set_photoId_info = function(info)
    {
      photoId_info = info;
    }
    yestoslideAuto.prototype.get_photoId_info = function()
    {
      return photoId_info;
    }
    yestoslideAuto.prototype.get_yestoslide_all_dataFolderId = function(){
      return yestoslide_all_dataFolderId;
    }
   
    yestoslideAuto.prototype.get_all_folders_names = function()
    {
      return all_folders;
    }
    yestoslideAuto.prototype.set_all_folders_names = function(folders)
    {
      all_folders = folders;
    }
    yestoslideAuto.prototype.is_upload_image_and_insert_to_deck_at_once = function(){

      //upload_image_and_insert_to_deck_at_once이 true면 반드시 original_slide_only도 true로 해야한다
      if(upload_image_and_insert_to_deck_at_once && original_slide_only ==false)
      {
        alert("upload_image_and_insert_to_deck_at_once와 original_slide_only 값을 확인하세요");
        return false;
      }
      return upload_image_and_insert_to_deck_at_once;
    };

    /*
    yestoslideAuto.prototype.get_big_image_size = function()
    {
      return big_image_size;
    }
    */
    yestoslideAuto.prototype.is_premium_user = function()
    {
      return premium_user
    }
    yestoslideAuto.prototype.set_premium_user = function(premium)
    {
      premium_user = premium;
    }
    /*
    yestoslideAuto.prototype.is_used_big_image = function()
    {
      return used_big_image;
    }
    */
    yestoslideAuto.prototype.is_original_slide_only = function()
    {
      return original_slide_only;
    }
    var current_attendances = [];
    yestoslideAuto.prototype.get_attendance_list = function (callback)
    {
      if(current_slides_id =="")
      {
        callback([]);
        return;
      }
      
      current_attendances =[];
      gapi.client.load('drive','v3', function(){
        var request = gapi.client.drive.files.get({
          'fileId': current_slides_id,
          //'fields': 'id,name,permissions'
          'fields': 'permissions'
          });
          request.execute(function(resp) {
            //console.log(resp.result.permissions);
            var permissions  = resp.result.permissions;
            
            for(var i = 0; i <permissions.length; i++)
            {

              //console.log(permissions[i]);
              if(permissions[i].role =="reader")
              {
                
                var info = {
                  email:"",
                  name:""
                }

                info["email"] = permissions[i].emailAddress;
                info["name"] = permissions[i].name;

                current_attendances.push(info);

              }

              

            }
            callback(current_attendances);
          });
      });
      
      

    }

    yestoslideAuto.prototype.get_remaining_space_quota = function(){

      console.log('quotaBytesTotal: ' + window.sunny_coordinator.formatBytes(quotaBytesTotal));
      console.log('quotaBytesUsed: ' + window.sunny_coordinator.formatBytes(quotaBytesUsed));
      console.log('quotaBytesUsedAggregate: ' + window.sunny_coordinator.formatBytes(quotaBytesUsedAggregate));
      console.log('quotaBytesUsedInTrash : ' + window.sunny_coordinator.formatBytes(quotaBytesUsedInTrash));

      return window.sunny_coordinator.formatBytes(quotaBytesTotal - quotaBytesUsedAggregate);

    }

    yestoslideAuto.prototype.get_usage_space_percentage = function(){

      console.log('quotaBytesTotal: ' + window.sunny_coordinator.formatBytes(quotaBytesTotal));
      console.log('quotaBytesUsed: ' + window.sunny_coordinator.formatBytes(quotaBytesUsed));
      console.log('quotaBytesUsedAggregate: ' + window.sunny_coordinator.formatBytes(quotaBytesUsedAggregate));
      console.log('quotaBytesUsedInTrash : ' + window.sunny_coordinator.formatBytes(quotaBytesUsedInTrash));

      return ((quotaBytesUsedAggregate/quotaBytesTotal)*100).toFixed(1);

    }

    yestoslideAuto.prototype.set_usage_info = function(result){

      
      window.sunny.quota_response = result;
      quotaBytesTotal =result.quotaBytesTotal;
      quotaBytesUsed = result.quotaBytesUsed;
      quotaBytesUsedAggregate = result.quotaBytesUsedAggregate;
      quotaBytesUsedInTrash = result.quotaBytesUsedInTrash;

      /*
      console.log('Current user name: ' + result.name);
      //console.log('Root folder ID: ' + resp.result.rootFolderId);
      console.log('quotaBytesTotal: ' + window.sunny_coordinator.formatBytes(result.quotaBytesTotal));
      console.log('quotaBytesUsed: ' + window.sunny_coordinator.formatBytes(result.quotaBytesUsed));
      console.log('quotaBytesUsedAggregate: ' + window.sunny_coordinator.formatBytes(result.quotaBytesUsedAggregate));
      console.log('quotaBytesUsedInTrash : ' + window.sunny_coordinator.formatBytes(result.quotaBytesUsedInTrash));
      */


    };

    yestoslideAuto.prototype.getParameterByName =function(name) {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
          results = regex.exec(location.search);
      return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }
    yestoslideAuto.prototype.set_standalone = function(standalone){
     
     
      sunny.standalone_mode = standalone;
    };
    yestoslideAuto.prototype.is_standalone = function(){
                 
      return sunny.standalone_mode;
    };

    yestoslideAuto.prototype.mark_slides_empty = function(empty){
      //console.log("empty", empty);
      slides_empty = empty;
    }
    yestoslideAuto.prototype.is_slides_empty = function(){
      
      console.log("is_slides_empty",slides_empty);
      return slides_empty;
    }
    yestoslideAuto.prototype.get_apps_script_link_for_conference_backup = function(){

      return apps_script_link_for_conference_backup;
    };
    yestoslideAuto.prototype.get_conference_backup_folder = function(){
      return conference_backup_folder;
    }
    yestoslideAuto.prototype.get_apps_script_link_for_presentation = function()
    {
       //main_apps_presentation
      return apps_script_link_for_presentation;
    };
    yestoslideAuto.prototype.get_apps_script_link_for_presentation_thumb = function()
    {
       //main_apps_presentation
      return apps_script_link_for_presentation_thumb;
    };
    yestoslideAuto.prototype.get_attendance_list_v2 = function(callback)
    {
      var slideObjectIds = [];
      //https://docs.google.com/presentation/d/1IIY5v2vLEftxU3slOy41BZJjoOskIVJtL52sWNIB7N0/edit#slide=id.p
      return window.gapi.client.slides.presentations.get({
        "presentationId": current_slides_id
      
      }).then(function(response) {
        
        console.log(response);
        
         callback(current_attendances)
        },
        function(err) {
            console.error("Execute error", err); 
            callback(current_attendances);
      });
    };


    yestoslideAuto.prototype.is_mobile = function()
    {
      
      var url_string = window.location.href
      var url = new URL(url_string);
      var use_mobile_fake = url.searchParams.get("use_mobile_fake");
      if(use_mobile_fake=="true")
      {
        return true;  
      }
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) 
        {
            return true;
        }
    
        if (typeof  window.orientation !== 'undefined') 
        {
            return true;
        }
    
        var iOSios = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
        if(iOSios)
            return true;
  
        return false;    
    
    };
    

    yestoslideAuto.prototype.padLeadingZeros = function(num, size) {
      var s = num+"";
      while (s.length < size) s = "0" + s;
      return s;
    }

    yestoslideAuto.prototype.set_ready_for_everything = function(ready=true)
    {
      ready_for_everything = ready;
    }

    yestoslideAuto.prototype.is_ready_for_everything = function()
    {
      return ready_for_everything ;
    }

    yestoslideAuto.prototype.set_is_client_login = function(flag){
      is_client_login = flag;
    }
    yestoslideAuto.prototype.get_is_client_login = function(){
      return  is_client_login ;
    }

    yestoslideAuto.prototype.set_is_client = function(flag){
      is_client = flag;
    }
    yestoslideAuto.prototype.get_is_client = function(){
      return  is_client ;
    }

    yestoslideAuto.prototype.set_controller = function(){
      currently_controller = true;
    }
    yestoslideAuto.prototype.is_controller = function(){
      return currently_controller;
    }
    yestoslideAuto.prototype.send_update_image = function(slideId, info,main_iframe,iframeId,chatboxId,chat_name,chat_comment,profileId)
    {
      var u = window.get_currentUser();
      
      var email_hash = window.sha256(u.email);
      
      window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/with_controller/').update({
        update_image:info
      });
    }

    

    


    yestoslideAuto.prototype.show_chat_box =function(main_iframe,info,chatboxId,chat_name,chat_comment,profileId)
    {
      return;
      console.log("show_chat_box");
      
      //console.log(main_iframe,iframeId,chatboxId,chat_name,chat_comment,profileId);
      main_iframe.document.getElementById(chat_name).innerHTML = info["Name"];
      main_iframe.document.getElementById(chat_comment).innerHTML = info["Comment"];
      //main_iframe.document.getElementById(chatboxId).style.display = "block";
      main_iframe.document.getElementById(chatboxId).classList.remove("d-none");

      main_iframe.document.getElementById(profileId).src = info["ProfileImage"];

      //main_iframe.document.getElementById("chat_boxID").style.visibility ="visible";
      main_iframe.document.getElementById("chat_boxID").style.visibility ="hidden";
    }

    var previous_displayed_image = "";

    yestoslideAuto.prototype.get_previous_displayed_image = function()
    {
      return previous_displayed_image;
    }

    yestoslideAuto.prototype.set_previous_displayed_image = function(imageUrl)
    {
      previous_displayed_image = imageUrl;
      console.log("prev image", previous_displayed_image);
    }

    

    yestoslideAuto.prototype.get_yestoslide_temporaryFolderId =function()
    {
      return yestoslide_temporaryFolderId;
    }
    yestoslideAuto.prototype.get_all_dataFolderId = function()
    {
      return yestoslide_all_dataFolderId;
    }
    yestoslideAuto.prototype.clear_image_content = function(iframeId="image_content",chatboxId="chat_boxID")
    {
      
      if(!window.sunny.is_controller())
      {
        main_iframe.document.getElementById(iframeId+"_twin").src = "";
        main_iframe.document.getElementById('bg_v2_twin').src = "./src/images/basic_blur.jpg";
        main_iframe.document.getElementById('bg_v2').src = "./src/images/basic_blur.jpg";
        main_iframe.document.getElementById(iframeId).src  ="";
        //yestoslideAuto.prototype.set_previous_displayed_image("");
        main_iframe.document.getElementById(chatboxId).style.visibility = "hidden";
      }
      
    }

    yestoslideAuto.prototype.get_current_buffering_iframe = function()
    {
      return current_buffering_iframe;
    }
    yestoslideAuto.prototype.set_current_buffering_iframe = function(ifrm)
    {
      current_buffering_iframe = ifrm;
    }




    yestoslideAuto.prototype.set_bg_according_setting = function(bgId,imgUrl)
    {
      
      console.log("set_bg_according_setting ", imgUrl);
      if (typeof(Storage) !== "undefined") {
        
  
        if(localStorage.getItem("yestoslide_blur_mode")=="background_black")
        {
          main_iframe.document.getElementById(bgId).src = './src/images/black.jpg';
          
        }
        else  if(localStorage.getItem("yestoslide_blur_mode")=="background_white")
        {
          main_iframe.document.getElementById(bgId).src = './src/images/white.jpg';
        }
        else
          //main_iframe.document.getElementById(bgId).src = "https://drive.google.com/uc?&id="+ imgUrl;
          main_iframe.document.getElementById(bgId).src =imgUrl;

        
      } 
      else
        //main_iframe.document.getElementById(bgId).src = "https://drive.google.com/uc?&id="+ imgUrl;
        main_iframe.document.getElementById(bgId).src = imgUrl;

      
    };

    yestoslideAuto.prototype.get_current_search_header_for_comment = function()
    {
      return current_search_header_for_comment;
    };

    yestoslideAuto.prototype.find_profileImg_from_spreadsheet_using_email = function(email,callback)
    {

      //slideID = "SLIDES_API1481727863_0";
      var searchColumns = "Email";
      var searchInput = email;
      
      var searchWords = searchInput.split(/\s+/);
      searchColumns = searchColumns.split(",");
      

      //console.log("headers ",headers);
      
      //var searchColumns = headers;
      //console.log("searchColumns ",searchColumns);
      

      //console.log(searchData);
      //console.log(searchInput);
      //console.log(searchWords);
      var resulsArray = searchInput === ""?[] : searchData.filter(function(r){

       
        return searchWords.every(function(word){
          return searchColumns.some(function(colIndex){
            //console.log(r[colIndex].toString() ," vs  "  ,word );
            return r[colIndex].toString().indexOf(word) !== -1;
          });
        });
       
      });

      console.log(resulsArray);
      callback(resulsArray);
      //console.log(resulsArray);

      
    }

    yestoslideAuto.prototype.find_comment_from_spreadsheet_using_google_slideID = function(slideID,callback)
    {

      //slideID = "SLIDES_API1481727863_0";
      var searchColumns = "ID";
      var searchInput = slideID;
      
      //console.log(slideID);
      var searchWords = searchInput.split(/\s+/);
      searchColumns = searchColumns.split(",");
      

      //console.log("headers ",headers);
      
      //var searchColumns = headers;
      //console.log("searchColumns ",searchColumns);
      

      //console.log(searchData);
      //console.log(searchInput);
      //console.log(searchWords);
      var resulsArray = searchInput === ""?[] : searchData.filter(function(r){

       
        return searchWords.every(function(word){
          return searchColumns.some(function(colIndex){
            //console.log(r[colIndex].toString() ," vs  "  ,word );
            return r[colIndex].toString().indexOf(word) !== -1;
          });
        });
       
      });

      //console.log(resulsArray);
      callback(resulsArray);
      //console.log(resulsArray);

      
    }
    yestoslideAuto.prototype.get_apps_script_url = function(callback){
        var u = window.get_currentUser();
        
        var email_hash = window.sha256(u.email);
        firebase.database().ref('thisisneverthat/apps_script_info/').once("value", function(snapshot){
            
            //console.log("from sunny",snapshot.val());
            
            apps_script_link_lecture = snapshot.val().main_apps_presentation;
            apps_script_link_for_sheets = snapshot.val().main_apps_presentation;
            apps_script_link_for_presentation = snapshot.val().main_apps_presentation;
            apps_script_link_for_presentation_thumb = snapshot.val().main_apps_presentation;
            apps_script_link_for_conference_backup = snapshot.val().main_apps_for_conference_backup;
            conference_backup_folder = snapshot.val().conference_backup_folder;
            apps_script_link_lecture_by_anyone =snapshot.val().main_apps_presentation;
            apps_script_link_lecture = snapshot.val().main_apps_presentation;
            apps_script_link_for_email = snapshot.val().main_apps_presentation;
            apps_script_link_for_history = snapshot.val().main_apps_presentation; //yestoslide.db@gmail.com 관리이메일은 mysunnygraphy
            current_history_folderId = snapshot.val().main_apps_history_folder;
            current_invitation_folderId = snapshot.val().main_apps_invitation_folder;
            presentation_image_template = snapshot.val().presentation_image_template;
            apps_script_link_for_slides_sheets = snapshot.val().main_apps_presentation;
            try{
              window.sunny_slides_sheets.set_link_for_slides_sheets(apps_script_link_for_slides_sheets);
            }
            catch(err)
            {

            }
            
            

            basic_info['apps_script_link_lecture'] = snapshot.val().main_apps_presentation;
            basic_info['apps_script_link_for_sheets'] = snapshot.val().main_apps_presentation;
            basic_info['apps_script_link_for_presentation'] = snapshot.val().main_apps_presentation;
            basic_info['apps_script_link_for_presentation_thumb'] = snapshot.val().main_apps_presentation;
            basic_info['apps_script_link_lecture_by_anyone'] =snapshot.val().main_apps_presentation;
            basic_info['apps_script_link_lecture'] = snapshot.val().main_apps_presentation;
            basic_info['apps_script_link_for_email'] = snapshot.val().main_apps_presentation;
            basic_info['presentation_image_template'] = snapshot.val().presentation_image_template;


            callback(true);
        });
    
     };


     yestoslideAuto.prototype.create_temporary_folder = function(parentId,callback)
     {
        var temporary_folder_exist = false;
        yestoslideAuto.prototype.listFolders_with_parent(parentId,function(folders){
          console.log(folders);

          for(var i = 0; i < folders.length;i++)
          {
            console.log(folders[i].name);
            if(folders[i].name == "temporary")
            {
              temporary_folder_exist = true;
              yestoslide_temporaryFolderId = folders[i].id;
             
              
              /*
              window.sunny.add_email_to_sharedLink_XMLHttpRequest("yestoslide@gmail.com",yestoslide_temporaryFolderId,function(rst){
                console.log(rst);
                console.log("add yestoslide@gmail.com to temporary folder");
              });
              */
              
              window.sunny.add_email_to_sharedLink(yestoslide_temporaryFolderId,"yestoslide@gmail.com",function(rst){
                console.log(rst);
                console.log("add yestoslide@gmail.com to temporary folder");
                
                
              });
              
              callback(true);
              
              
              return;
              
            }
      
          }
          if(!temporary_folder_exist)
          {
            
            console.log("yestoslide_temporaryFolderId",temporary_folder_exist);
            yestoslideAuto.prototype.create_folder_with_parent("temporary",parentId,function(folderId){
              yestoslide_temporaryFolderId  = folderId;
              callback(true);
              window.sunny.add_email_to_sharedLink(yestoslide_temporaryFolderId,"yestoslide@gmail.com",function(rst){
                console.log(rst);
                console.log("add yestoslide@gmail.com to temporary folder");
                
                
              });
              
              
            });
          }

        });
      

     };

     yestoslideAuto.prototype.get_all_folders = function(ignore_this,callback){

      
      if(ignore_this)
      {
        callback(true);
        return;
      }
      
      console.log("get_all_folders")
        yestoslideAuto.prototype.listFolders_with_parent('root',function(rst){
            all_folders =rst;
            console.log(all_folders);
           
            sunny_modal.show_spinner("메인 폴더 2-1/6");
            yestoslideAuto.prototype.create_main_yestoslide_folder(function(rst){
                
              
              sunny_modal.show_spinner("데이터 폴더 2-2/6");
                yestoslideAuto.prototype.create_yestoslide_all_data_folder(function(rst){
                  console.log(all_folders);
                  sunny_modal.show_spinner("Temp 폴더 2-3/6");
                    yestoslideAuto.prototype.create_temporary_folder(yestoslide_all_dataFolderId,function(rst){
                      console.log(rst);
                      //console.log("yestoslide_temporaryFolderId",yestoslide_temporaryFolderId);
                      sunny_modal.show_spinner("DB 폴더 2-4/6");
                      yestoslideAuto.prototype.add_email_to_sharedLink(yestoslide_temporaryFolderId,"yestoslide@gmail.com",function(rst){
                        console.log(rst);

                        
                       
                        yestoslideAuto.prototype.create_database_folder(function(rst){
                    
                          sunny_modal.show_spinner("작업 폴더 2-5/6");
                          yestoslideAuto.prototype.create_working_folder(function(rst){
                              
                            var u = window.get_currentUser();
                           
                            console.log("create_working_folder",coordinator_email,u.email);
                            if(coordinator_email == u.email)
                            {
                              sunny_modal.show_spinner("템플리트 폴더 2-6/6");
                              yestoslideAuto.prototype.create_template_folder(function(rst){
                              
                                yestoslideAuto.prototype.check_template_exist();
                                sunny_modal.show_spinner("이미지 폴더 2-7/6");
                                yestoslideAuto.prototype.create_share_folder(function(rst){
                              
                                  callback(true);
                                  //yestoslideAuto.prototype.make_anyone_reader(sharing_folder,function(rst){
                                  //  console.log(rst);
                                  //  callback(true);
                                  //});
                        
                               
                                });
                      
                             
                              });
                              
                            }
                            else
                            {
                              callback(true);
                            }
                            
                              
                          });
                  
                        });

                      });
                    });
                 

                
                });
               
             })
            
          });
    };

    yestoslideAuto.prototype.changeParents_w_callback =function( fileId,previousParents,newfolderId,callback ){
        console.log("fileId,previousParents,newfolderId ",fileId,previousParents,newfolderId);
        window.gapi.client.drive.files.update({
          'fileId': fileId,
            'addParents': newfolderId,
            'removeParents': previousParents
        })
        .then((res) => {
          console.log(res);
          callback(true);
      
        },function(response) {
          
          console.log(response);
          callback(false);
        });
    };

    yestoslideAuto.prototype.copyFile_to_specific_folder =function(fildId, parent,copyTitle,callback){
      
      return;
      console.log(fildId, parent,copyTitle);
      window.gapi.client.load('drive','v3', function(){

        var request = {
          title: copyTitle,
          'parents': [parent],
        };
        gapi.client.drive.files.copy({
          fileId: fildId,
          resource: request
        }).then((driveResponse) => {
          //var presentationCopyId = driveResponse.result.id;
          console.log(driveResponse.result.id);
          console.log("parent",parent);
          callback(driveResponse.result.id);
          // [END_EXCLUDE]
        });
        // [END slides_copy_presentation]
      });

      
    };

    yestoslideAuto.prototype.check_template_exist = function(){
      
      window.gapi.client.load('drive','v2', function(){
      
        
        var request = window.gapi.client.drive.files.list({'maxResults': 1000 ,'q': "'" + template_folder + "' in parents and trashed=false " });
        request.execute(function(resp) { 
          
          var lists = resp.result;
          //all_folders = lists.items.slice();;
          //callback(lists.items);
          console.log("template file list",lists);
          console.log("lists.length",lists.files.length);
          if(lists.files.length ==0)
          {
            
            yestoslideAuto.prototype.copyFile_to_specific_folder(presentation_image_template, template_folder,"blank_presenttation_temlate",function(fid){
              console.log(fid);

              yestoslideAuto.prototype.changeParents_w_callback( fid,'root',yestoslideAuto.prototype.get_current_template_folder() ,function(rst){
                console.log(rst);
              });

            });
            return;
          }
          else{
            var found_template = false;
            for(var i= 0; i<lists.items.length ; i ++)
            {
              console.log(lists.items[i].title);
              if(lists.items[i].title =="blank_presenttation_temlate")
              {
                found_template = true;
                break;
              }
              //blank_presenttation_temlate
            }
            if(!found_template)
            {
              yestoslideAuto.prototype.copyFile_to_specific_folder(presentation_image_template, template_folder,"blank_presenttation_temlate",function(fid){
                console.log(fid);
  
                yestoslideAuto.prototype.changeParents_w_callback( fid,'root',yestoslideAuto.prototype.get_current_template_folder() ,function(rst){
                  console.log(rst);
                });
  
              });
            }
          }

          
        });
        
      });

    };

    yestoslideAuto.prototype.listFolders_with_parent = function(parentId,callback){

       
       
        if(!window.is_signed_google())
        {
          console.log("signed_in_google_ok",window.is_signed_google());
          callback([]);
          return;
      
        }

        
        window.gapi.client.load('drive','v2', function(){
      
          //console.log("parentId",parentId);
          //'q': "'" + parentFolderId + "' in parents and trashed = false"
          try{
            var request = window.gapi.client.drive.files.list({'maxResults': 1000 ,'q': "'" + parentId + "' in parents and trashed=false  and  mimeType = 'application/vnd.google-apps.folder'" });
            request.execute(function(resp) { 
              //console.log(resp);
              if(typeof resp.code !== "undefined")
              {
                var current_web_region = navigator.language;
                if(current_web_region.indexOf("ko") != -1)
                {
                  alert("구글 드라이브 파일 접근 권한을 허락해주세요");
                  //alert(resp.error.message);
                }
                else
                  alert(resp.error.message);
                location.href = "https://yestoslide.com";
              }
            
              var lists = resp.result;
              //all_folders = lists.items.slice();;
              //console.log(lists.files);
              callback(lists.files);
              
            });
          }
          catch(err)
          {
            console.log(err.message);
            callback([]);
          }
          
          
        });
    };

    yestoslideAuto.prototype.create_main_yestoslide_folder = function(callback){
        var main_folder_exist = false;

        //console.log(all_folders);
        console.log("create_main_yestoslide_folder ",all_folders.length );
        window.gapi.client.load('drive','v2', function(){
          for(var i = 0; i < all_folders.length;i++)
          {
            console.log(all_folders[i].name);
            if(all_folders[i].name == yestoslide_folder_name)
            {
              console.log("found yestoslide_folder_name");
              
              main_folder_exist = true;
              yestoslide_main_folder_id = all_folders[i].id;
              var request = window.gapi.client.drive.files.list({'maxResults': 1000 ,'q': "'" + yestoslide_main_folder_id + "' in parents and trashed=false  and  mimeType = 'application/vnd.google-apps.folder'" });
              request.execute(function(resp) { 
                var lists = resp.result;
                all_folders = lists.files.slice();

                //console.log(all_folders);
                callback(true);
                return;
              });
              
            }
        
          }
          if(!main_folder_exist)
          {
            console.log("main_folder_exist",main_folder_exist);
            yestoslideAuto.prototype.create_folder_with_parent(yestoslide_folder_name,'root',function(folderId){
              yestoslide_main_folder_id = folderId;

              //console.log("yestoslide_main_folder_id",yestoslide_main_folder_id);
              var request = window.gapi.client.drive.files.list({'maxResults': 1000 ,'q': "'" + yestoslide_main_folder_id + "' in parents and trashed=false  and  mimeType = 'application/vnd.google-apps.folder'" });
              request.execute(function(resp) { 
                //console.log(resp);
                var lists = resp.result;
                
                //console.log(lists);
                callback(true);
                return;
                all_folders = lists.items.slice();
                
              });
              
            });
          }
        });
        
        
    };
    yestoslideAuto.prototype.create_yestoslide_all_data_folder = function(callback)
    {
    
        var all_data_folder_exist = false;
        for(var i = 0; i < all_folders.length;i++)
        {
          console.log(all_folders[i].name);
          if(all_folders[i].name == "yestoslide_all_data")
          {
            all_data_folder_exist = true;
            yestoslide_all_dataFolderId = all_folders[i].id;
            callback(true);
            return;
            
          }
    
        }
        if(!all_data_folder_exist)
        {
          console.log("yestoslide_all_dataFolderId",all_data_folder_exist);
          yestoslideAuto.prototype.create_folder_with_parent("yestoslide_all_data",yestoslide_main_folder_id,function(folderId){
            yestoslide_all_dataFolderId  = folderId;
            callback(true);
            
          });
        }
    
      
    };
    yestoslideAuto.prototype.create_database_folder = function(callback)
    {
      if(yestoslide_database_FolderId != "")
      {
        callback(true);
        return;
      }
      var database_folder_exist = false;
      for(var i = 0; i < all_folders.length;i++)
      {
        
        if(all_folders[i].name == "yestoslide_database")
        {
          console.log(all_folders[i].name);
          database_folder_exist = true;
          yestoslide_database_FolderId = all_folders[i].id;
          
          callback(true);
          return;
          
        }
    
      }
      
      if(!database_folder_exist)
      {
        
        console.log("yestoslide_database FolderId",database_folder_exist);
        yestoslideAuto.prototype.create_folder_with_parent("yestoslide_database",yestoslide_main_folder_id,function(folderId){
         
          yestoslide_database_FolderId  = folderId;
          callback(true);
          
        });
      }
    };

    yestoslideAuto.prototype.create_template_folder =function(callback)
    {

        var template_folder_exist = false;
        for(var i = 0; i < all_folders.length;i++)
        {
            console.log(all_folders[i].name);
            if(all_folders[i].name == "yestoslide_template")
            {
              template_folder_exist = true;

              template_folder = all_folders[i].id;
              console.log("template_folder",template_folder);
              callback(true);
                return;
                
            }

        }

        if(!template_folder_exist)
        {
            console.log("template_folder_exist",template_folder_exist);
            yestoslideAuto.prototype.create_folder_with_parent("yestoslide_template",yestoslide_main_folder_id,function(folderId){
              template_folder  = folderId;
              callback(true);
                
            });
        }
    
    };
    yestoslideAuto.prototype.create_share_folder =function(callback)
    {

        var sharing_folder_exist = false;
        for(var i = 0; i < all_folders.length;i++)
        {
            console.log(all_folders[i].name);
            if(all_folders[i].name == "yestoslide_sharing")
            {
              sharing_folder_exist = true;

              sharing_folder = all_folders[i].id;
              console.log("sharing_folder",sharing_folder);
              callback(true);
                return;
                
            }

        }

        if(!sharing_folder_exist)
        {
            console.log("sharing_folder_exist",sharing_folder_exist);
            yestoslideAuto.prototype.create_folder_with_parent("yestoslide_sharing",yestoslide_main_folder_id,function(folderId){
              sharing_folder  = folderId;
              callback(true);
                
            });
        }
    
    };

    yestoslideAuto.prototype.create_working_folder =function(callback)
    {

        var working_folder_exist = false;
        for(var i = 0; i < all_folders.length;i++)
        {
            console.log(all_folders[i].name);
            if(all_folders[i].name == "yestoslide_working")
            {
                working_folder_exist = true;
                working_folder = all_folders[i].id;
                callback(true);
                return;
                
            }

        }

        if(!working_folder_exist)
        {
            console.log("working_folder_exist",working_folder_exist);
            yestoslideAuto.prototype.create_folder_with_parent("yestoslide_working",yestoslide_main_folder_id,function(folderId){
                working_folder  = folderId;
                callback(true);
                
            });
        }
    
    };

    yestoslideAuto.prototype.create_folder_with_parent = function (name,parentId,callback)
    {
      console.log(name,parentId);
      var request = window.gapi.client.request({
        'path': '/drive/v2/files',
        'method': 'POST',
        'body': {
        "parents" : [{'id':parentId}],
        "title" : name,
        "mimeType" : "application/vnd.google-apps.folder"
      
        }
      }).then(function(driveResponse)  {
        
        console.log(driveResponse);
          try
          {
            try{
              console.log(driveResponse.result.id);
            }
            catch(err)
            {
              console.log(err.message);
            }
            callback(driveResponse.result.id);
            
            
          }
          catch(err)
          {
            console.log(err.message);
            callback("");
          }
                      
                    
        //alert(driveResponse);
        
    
        }, function(response) {
          
          console.log(response);
          callback("");
        });
    };



    yestoslideAuto.prototype.getBasicInfo = function(){
        
       //console.log(basic_info);
       return basic_info;
     };
     
     yestoslideAuto.prototype.setCoordinatorEmail = function(coordi_email){
        coordinator_email = coordi_email;
     };

     yestoslideAuto.prototype.setCoordinatorProfileImageUrl = function(profileUrl)
     {
       
      coordinator_profileImageUrl = profileUrl;
     }
     
     yestoslideAuto.prototype.getCoordinatorEmail = function(){
       return coordinator_email;
    };
    yestoslideAuto.prototype.getCoordinatorProfileImageUrl = function(){
      return coordinator_profileImageUrl;
   };
    yestoslideAuto.prototype.check_spreadsheet = function(callback)
    {

        callback(true);
        return;
        console.log("check spreadsheet");
        var u = window.get_currentUser();
        var email_hash = window.sha256(u.email);
        window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/with_clients_sheets/').once("value", function(snapshot){
            //console.log(snapshot.val());
            //console.log(snapshot.val().slideId);
            if(snapshot.val() == null)    
            {
                yestoslideAuto.prototype.create_sheet(yestoslide_database_FolderId,function(rst){
                //console.log("created spreadsheet");
                callback(true);
            });
            }
            else
            {

                yestoslideAuto.prototype.check_sheets_exist(snapshot.val().sheetsId,function(rst){
                if(rst)
                {

                
                  //console.log("spreadsheet already exist!!!");
                  current_spreadSheetId = snapshot.val().sheetsId;
                  current_sheet_name = snapshot.val().tab_name;
                  current_spreadsheet_name =snapshot.val().title;
                  callback(true);
                
                } 
                else
                {

                    console.log("sheets not exist, so remove from db ");
                    window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/with_clients_sheets/').remove();

                    
                    current_spreadSheetId = "";
                    current_sheet_name = "";
                    console.log("yestoslide_database_FolderId",yestoslide_database_FolderId);
                    yestoslideAuto.prototype.create_sheet(yestoslide_database_FolderId,function(rst){
                        //console.log("created spreadsheet");
                        callback(true);
                    });
                
                
                
                } 
            })
        
            }
        });
  

    };

    var presentations_info = [];
    yestoslideAuto.prototype.make_all_presentation_list =function(callback)
    {
      presentations_info =[];

      console.log("make_all_presentation_list");
      yestoslideAuto.prototype.listFiles_with_parent(yestoslide_all_dataFolderId,function(files){
        console.log("end listFiles_with_parent");;
        console.log(files);

        for(var i = 0; i <files.length;i++)
        {

          
          //console.log(files[i].id,files[i].title);
          if(window.sunny.is_original_slide_only())
          {
            if(files[i].title.indexOf("temporary")  != -1)
            {
              continue;
            }
            else if(files[i].title.indexOf("_original")  == -1)
            {
              continue
            }
            
          }
          else
          {
            if(files[i].title.indexOf("_original") != -1 || files[i].title.indexOf("temporary")  != -1)
            {
              continue;
            }
          }
          


          
          if(typeof files[i].description === "undefined")
          {
            continue;
          }
          

          var info={
            id:"",
            title:"",
            description:"",
            create_date:""
          }
          try{
            var obj = JSON.parse(files[i].description);
            //console.log(files[i].description);
            //console.log(obj);
            info["id"] = files[i].id;
            info["title"] = obj.conference_name;
            info["create_date"] =  files[i].createdDate;
            info["description"] =  obj;


            
            if(obj.conference_name =="")
            {
              continue;
            }
            
            presentations_info.push(info);
          }
          catch(err)
          {

          }
          
          
        }

        //console.log("presentations_info.length",presentations_info.length);
        presentations_info.sort(yestoslideAuto.prototype.dynamicSort("-create_date"));
        callback(presentations_info);
      });
    }

    yestoslideAuto.prototype.get_presentation_list =function()
    {
       return presentations_info;
    }
    yestoslideAuto.prototype.check_sheets_exist =function(sheetsId,callback)
    {


        //console.log("sheetsID****************",sheetsId);

        //console.log("yestoslide_database_FolderId",yestoslide_database_FolderId);
        yestoslideAuto.prototype.listFiles_with_parent(yestoslide_database_FolderId,function(rst){
            console.log("yestoslide_database_FolderId",yestoslide_database_FolderId);
            console.log(rst);
            for(var i = 0; i <rst.length;i++)
            {
            //console.log(rst[i]);
            if(rst[i].id == sheetsId)
            {
                callback(true);
                return;
            }
            }
            callback(false);
        });
    
    
    };

    yestoslideAuto.prototype.listFiles_with_parent = function(parentId,callback) {
        if(!window.is_signed_google())
        {
          console.log("signed_in_google_ok",window.signed_in_google_ok);
          callback([]);
          return;
      
        }
        console.log("listFiles_with_parent");
        window.gapi.client.load('drive','v2', function(){
      
          
          var request = window.gapi.client.drive.files.list({'maxResults': 1000 ,'q': "'" + parentId + "' in parents and trashed=false " });
          request.execute(function(resp) { 
            console.log(resp);

            if(typeof resp.code !== "undefined")
            {
              callback([]);
            }
            else
            {
              try{
                var lists = resp.result;
                //all_folders = lists.items.slice();;
                callback(lists.files);
              }
              catch(err)
              {
                alert("Error occurred ");
                console.log(err.message);
                callback([]);
  
  
              }
            }
            
            
            
      
           
            return;
            
            
          });
          
        });
        
    };

    yestoslideAuto.prototype.pad = function(number, length) {
        var str = '' + number;
        while (str.length < length) {
            str = '0' + str;
        }
        return str;
      }
      
    Date.prototype.YYYYMMDDHHMMSS = function () {
        var yyyy = this.getFullYear().toString();
        var MM = yestoslideAuto.prototype.pad(this.getMonth() + 1,2);
        var dd = yestoslideAuto.prototype.pad(this.getDate(), 2);
        var hh = yestoslideAuto.prototype.pad(this.getHours(), 2);
        var mm = yestoslideAuto.prototype.pad(this.getMinutes(), 2)
        var ss = yestoslideAuto.prototype.pad(this.getSeconds(), 2)

        return yyyy + MM + dd+  hh + mm + ss;
    };

    yestoslideAuto.prototype.get_YYYYMMDDHHMMSS =function(){
      var d = new Date();
      return d.YYYYMMDDHHMMSS();
    }

    yestoslideAuto.prototype.createMyPresentation = function(title,  callback) {


      var quit_timer = false;

      var time_passed = 0;
      var create_timer = setInterval(() => {
        time_passed = time_passed + 2000;
        if(quit_timer)
        {
          clearInterval(create_timer);
        }
        else
        {
          if(time_passed > 20 * 1000)
          {
            clearInterval(create_timer);
            console.log("timeout in creating slide");
            callback("");
          }
        }

      }, 2000);

      console.log("get_photoID_hash()",get_photoID_hash());
        if(get_photoID_hash() == null)
        {

          quit_timer = true;
          alert(get_photoID_hash());
          callback("");
          return;
        }
        
        console.log("get_current_conference_folderID()",window.sunny.get_current_conference_folderID());

        window.sunny_modal.show_spinner("슬라이드 생성중..");
        if(true)//window.sunny.is_premium_user() && window.sunny.get_current_image_size() !="default")
        {
          console.log(window.sunny.get_current_image_size());
          var fileId ="";
          if(window.sunny.get_current_image_size() =="default")
           //fileId = "1vg7UpI7MJfNH37irFhpcKoocSdH4PMjlsUys8fHNHcA"; //default
           fileId = "1V06nYdldl18WepLvGzAJqKKaFhRuiSUImVJY4DYjqD4"; //1920x1080
          else if(window.sunny.get_current_image_size() =="1920x1080")
           fileId = "1V06nYdldl18WepLvGzAJqKKaFhRuiSUImVJY4DYjqD4"; //1920x1080
          else if(window.sunny.get_current_image_size() =="2880x1620")
            fileId = "1GD9r98NM3OsKxtTAIGK94n7YVxrObMHAtxKOt_sI2-c"; //2880x1620
          
            
          window.gapi.client.load('drive','v3', function(){

            var request = {
              'name': title,
              'parents': [window.sunny.get_current_conference_folderID()],
            };
            gapi.client.drive.files.copy({
              fileId: fileId,
              resource: request
            }).then((driveResponse) => {
              //var presentationCopyId = driveResponse.result.id;
              window.gapi.client.drive.files.update({
                'fileId': driveResponse.result.id,
                  'addParents': window.sunny.get_current_conference_folderID(),
                  'removeParents': "root"
              })
              .then((res) => {
                
                console.log(driveResponse.result.id);
                //console.log("parent",parent);
                //callback(driveResponse.result.id);
                quit_timer = true;
                callback(driveResponse.result.id);
            
              },function(response) {
                quit_timer = true;
                console.log(response);
                callback("");
              });
              
              // [END_EXCLUDE]
            }, function(response) {
              console.log("copy slide fail");
              quit_timer = true;       
                console.log(response);
                callback("");
            });
            // [END slides_copy_presentation]
          });
        }
        else
        {
          var body= {"name": title, 
          "mimeType": "application/vnd.google-apps.presentation",
          //"parents": [yestoslide_all_dataFolderId]}
          //"parents": [yestoslide_temporaryFolderId]}
          "parents": [window.sunny.get_current_conference_folderID()]}
       
          window.gapi.client.request({
            'path': 'https://www.googleapis.com/drive/v3/files/',
            'method': 'POST',
            'body': body
          }).then(function(jsonResp,rawResp) {
              console.log(jsonResp)
              quit_timer = true;
              window.sunny_modal.show_spinner("생성됨");
              callback(jsonResp.result.id);
          }, function(response) {
                       
            quit_timer = true;
            callback("");
           });
        }
       
        
        
        
        
          
    };
    

    var created_presentaion_name = "";
    var is_collecting_started = true;
    var unused_presentation_ready = false;
    var ready_main_deck_immediatey = false;
    yestoslideAuto.prototype.set_main_slides_ready_immediately = function(bool_val)
    {
      ready_main_deck_immediatey = bool_val;
    }

    yestoslideAuto.prototype.set_created_presentaion_name = function(name){
      created_presentaion_name = name;
    }
    yestoslideAuto.prototype.set_collecting_flag=function(starting)
    {

      console.log("set_stopped_collecting********",!starting);
      yestoslideAuto.prototype.set_stopped_collecting(!starting);
      var u = window.get_currentUser();
      var email_hash = window.sha256(u.email);
      window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/collecting/data/').update({
        collecting_started:starting,
        
        is_history :false,
        stime:window.firebase.database.ServerValue.TIMESTAMP
      });

      window.sunny_prev_decks.set_history_deck_opened(false);
    }
    yestoslideAuto.prototype.get_collecting_flag=function(callback)
    {

      console.log("get_collecting_flag");
      var u = window.get_currentUser();
      var email_hash = window.sha256(u.email);
      window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/collecting/').once("value", function(snapshot){
        
        console.log(snapshot.val());
        if(snapshot.val() != null) 
        {
          console.log(snapshot.val());
          callback(snapshot.val().data.collecting_started);
        }
        else
        {
          callback(false);
        }
      });
    }

    yestoslideAuto.prototype.get_unused_presentation_ready = function()
    {
      return unused_presentation_ready; 
    }
    yestoslideAuto.prototype.set_unused_presentation_ready = function(bool_val)
    {
     
      console.log("********************set_unused_presentation_ready",bool_val);
      unused_presentation_ready =bool_val; 

     
    }
    yestoslideAuto.prototype.createNewPresentaion = function(callback){

      
     
      //is_collecting_started = false;
      //yestoslideAuto.prototype.set_collecting_flag(false);
      yestoslideAuto.prototype.set_unused_presentation_ready(false);
      if(ready_main_deck_immediatey)
      {
        //is_collecting_started = true;
      }
      
      //yestoslideAuto.prototype.set_collecting_flag(is_collecting_started);

      ready_main_deck_immediatey = false;


      
     
      var d = new Date();
      created_presentaion_name = d.YYYYMMDDHHMMSS();
      var sheetname = created_presentaion_name;
      
      yestoslideAuto.prototype.createNewSlides_for_original(function(rst){
       
        console.log(rst);
        
        if(rst)
        {
          
          window.sunny_images.create_subfolder_in_sharing(function(rst2)
          {
            console.log("create_subfolder_in_sharing");
            yestoslideAuto.prototype.createNewSlides(function(rst){
              if(rst)
              {
                yestoslideAuto.prototype.set_unused_presentation_ready(true);
                yestoslideAuto.prototype.add_new_ws(sheetname);
              }
              callback(rst);
            });
          });
          
          
        }
        else
        {
          callback(rst);
        }
        
      });

    } ;

    yestoslideAuto.prototype.remove_presentation_in_root_only = function(){
      var url = apps_script_link_lecture; //ImageControl-lecturer_me_owner
         
      console.log(url);
              
      var http = new XMLHttpRequest();

    
      //e.parameters.create_slides_by_yestoslide,e.parameters.parentId, e.parameters.coordinatorEmail
      var params = "remove_presentation_in_root_only=";

      console.log(params);
      http.open("POST", url, true);

      //Send the proper header information along with the request
      http.setRequestHeader("Content-type", "application/x-www-form-urlencoded;");

      //Call a function when the state changes.
      http.onreadystatechange = function() {
          
          if (http.readyState==4) {
          
            console.log(http.responseText);
            
          }
      } // end callback

      http.send(params);
    }
    yestoslideAuto.prototype.create_slides_by_yestoslide = function(name, parentId,email,callback)
    {
      yestoslideAuto.prototype.remove_presentation_in_root_only();
    
      console.log(name);
      yestoslideAuto.prototype.createMyPresentation(name,function(presentId){

        
        console.log(presentId);

        if(presentId == "")
        {
          callback("");
          return;
        }
        /*
        var body = {
          'emailAddress': "yestoslide@gmail.com",
          'type': "user",
          'role': "writer"
        };
        */
       if(true)//window.sunny.get_current_image_size() != "default")
       {
        callback(presentId);
        return;
       }
        
        
        //자동 생성된 첫번째 슬라이드 삭제
        window.gapi.client.slides.presentations.batchUpdate({
          "presentationId": presentId,
          "resource": {
            "requests": [
              {
                "deleteObject": {
                  "objectId": "p"
                }
              }
            ]
          }
        })
        .then(function(response) {
          // Handle the results here (response.result has the parsed body).
          console.log("Response", response);
          
          callback(presentId);
        },
        function(err) { console.error("Execute error", err);callback(""); });

        //ownership을 바꾸지 않았다
        
        return;
        console.log(presentId);
        window.gapi.client.load('drive','v3', function(){
          var request = window.gapi.client.drive.permissions.insert({
            fileId: presentId,
            sendNotificationEmails: false,
            resource: {
              emailAddress:"yestoslide@gmail.com",
              type:"user",
              role:"writer"
          }
          }).then((response) => {
                //console.log(response.result.spreadsheetId);
                console.log( response );

                var request2 = gapi.client.drive.permissions.list({
                  'fileId': presentId
                });
                //body.role = role;
                request2.execute(function(resp2) { 
                  console.log(resp2);
                  
                  var pid = "";
                    
                  if(typeof resp2.items !== "undefined")
                  {
                    for(var i = 0; i< resp2.items.length ; i++)
                    {
                      console.log(resp2.items[i].emailAddress,resp2.items[i].id);
                      if(resp2.items[i].emailAddress =="yestoslide@gmail.com")
                      {
                        pid = resp2.items[i].id;
                        break;
                      }
                    }
                    

                  }
                  else
                  {
                    for(var i = 0; i< resp2.permissions.length ; i++)
                    {
                      console.log(resp2.permissions[i].emailAddress,resp2.permissions[i].id);
                      if(resp2.permissions[i].emailAddress =="yestoslide@gmail.com")
                      {
                        pid = resp2.permissions[i].id;
                        break;
                      }
                    }
                  }
                  
                  console.log("pid ",pid);
                  var request3 = gapi.client.drive.permissions.update({
                    'fileId': presentId,
                    'permissionId': pid, //permission id of writer
                    'transferOwnership': true,
                    'resource': {'role':"owner", 'emailAddress': "yestoslide@gmail.co"}
                  });
                  request3.execute(function(resp3) {
                    console.log(resp3);

                   //
                   window.gapi.client.slides.presentations.batchUpdate({
                    "presentationId": presentId,
                    "resource": {
                      "requests": [
                        {
                          "deleteObject": {
                            "objectId": "p"
                          }
                        }
                      ]
                    }
                  })
                      .then(function(response) {
                              // Handle the results here (response.result has the parsed body).
                              console.log("Response", response);
                             
                              callback(presentId);
                            },
                            function(err) { console.error("Execute error", err);callback(""); });
                   //

                  });
                  return;
                  var request3 = gapi.client.drive.permissions.update({
                    'fileId': fileId,
                    'permissionId': resp2.permissions[1].id, //permission id of writer
                    'transferOwnership': true,
                    'resource': {'role':role, 'emailAddress': value}
                  });
                  request3.execute(function(resp3) {
                    console.log(resp3);
                  });
                });

                
              
          }).catch(function(error) {
              console.log("fail",error);
              callback("");
              
          });
        });
        

        
      });

      return;
      
      //https://docs.google.com/spreadsheets/d/15ObU-T8AOoxsecbc2RtTDoo8KVlUmv5WwIw1NWe0wZ0/edit?usp=sharing
      //var current_header = "ID,CreateTime,Comment";
          
          
          var url = apps_script_link_lecture;
          
              
          var http = new XMLHttpRequest();
   
       
          //e.parameters.create_slides_by_yestoslide,e.parameters.parentId, e.parameters.coordinatorEmail
          var params = "create_slides_by_yestoslide=" + name+"&parentId="+parentId+"&coordinatorEmail="+email ;

          console.log(params);
          http.open("POST", url, true);
  
          //Send the proper header information along with the request
          http.setRequestHeader("Content-type", "application/x-www-form-urlencoded;");
  
          //Call a function when the state changes.
          http.onreadystatechange = function() {
              if (http.readyState==4) {
              
                console.log(http.responseText);
               
                callback(http.responseText);

                
               
              
              }
          } // end callback
  
          http.send(params);
    };
    yestoslideAuto.prototype.createNewSlides = function(callback)
    {

      if(window.sunny.is_original_slide_only())
      {
        callback(true);
        return;
      }
      var d = new Date();
      var parentId =  yestoslide_temporaryFolderId;
      var email = coordinator_email;
      
      var slides_name = d.YYYYMMDDHHMMSS();
      slides_name = created_presentaion_name;
      console.log(slides_name, parentId,email);
        this.create_slides_by_yestoslide(slides_name, parentId,email,function(slidesId){
          if(slidesId == "")
          {
            callback(false);
            return;
          }
          console.log(slidesId);
          current_slides_id = slidesId;
          var u = window.get_currentUser();
          console.log(u);
          var email_hash = window.sha256(u.email);
          window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/with_clients/').update({
              slideId:current_slides_id,
              title:slides_name
          });
          callback(true);
          return;

        });
        
        //return;


    
    };


    yestoslideAuto.prototype.erase_working_sheet = function()
    {
      working_folder = "";
      sharing_folder = "";
      template_folder = "";
      yestoslide_all_dataFolderId = "";
      yestoslide_database_FolderId  ="";
      yestoslide_main_folder_id ="";
      var u = window.get_currentUser();
      var email_hash = window.sha256(u.email);
      window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/with_clients_sheets/').update({
        tab_name:""
      });
      
    }

    var stopped_collecting = true;
    yestoslideAuto.prototype.get_stopped_collecting = function()
    {

      console.log("******** stopped_collecting", stopped_collecting);
      return stopped_collecting;
    }

    yestoslideAuto.prototype.set_stopped_collecting = function(stopped)
    {
      

      console.log("inside set_stopped_collecting",stopped);
      stopped_collecting =stopped;
      console.log("******** stopped_collecting", stopped_collecting);

      var u = window.get_currentUser();
      var email_hash = window.sha256(u.email);
      window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/collecting/data/').update({
        
        stopped_collecting :stopped,
        stime:window.firebase.database.ServerValue.TIMESTAMP
      });
    }

    yestoslideAuto.prototype.clear_when_create_new_presentation =function ()
    {
      var u = window.get_currentUser();
      var email_hash = window.sha256(u.email);
      window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/with_voting/').remove();
      window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/newly_added_slide/').remove(); 
      
      window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/for_attendances/').remove();

      //main_iframe.document.getElementById("img_collection").contentWindow.change_sorting_order_only_by_value("newest");
    }
    yestoslideAuto.prototype.stop_collecting = function(callback)
    {

      window.sunny_modal.close_general_modal();
      window.sunny_images.clear_main_image();
      
      console.log("stop_collecting");
      var u = window.get_currentUser();
      var email_hash = window.sha256(u.email);

      //console.log("set_stopped_collecting",true);
      //yestoslideAuto.prototype.set_stopped_collecting(true);

      console.log("set_collecting_flag called");
      yestoslideAuto.prototype.set_collecting_flag(false);
      yestoslideAuto.prototype.set_unused_presentation_ready(false);


      //window.sunny_slides_sheets.is_empty_presentation(current_orignial_slides_id,function(is_empty){
      if(window.sunny.is_slides_empty())
      {
        console.log("slides empty");
        slides_empty = true;
        window.sunny_coordinator.remove_all_files_from_temporary(function(rst){
          //window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/with_clients/').remove();
          window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash()).remove();
          window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/with_voting/').remove();
          window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/newly_added_slide/').remove(); 
          callback(true);

        });
        
      }
      else
      {
        slides_empty = true;
        window.sunny_coordinator.move_all_files_from_temporary(function(rst){

          //window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/with_clients/').remove();
          window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash()).remove();
          window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/with_voting/').remove();
          window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/newly_added_slide/').remove();
          console.log("newly_added_slide removed");
          
          window.sunny_slides_sheets.copy_conference_presents_to_conference_backup_folder(current_slides_id,current_orignial_slides_id,function(rst){
            console.log(rst);

            try{
              console.log(window.sunny.get_current_original_presentationID());
              window.sunny.add_email_to_sharedLink(window.sunny.get_current_original_presentationID(),"yestoslide@gmail.com",function(rst){
                console.log(rst);
                yestoslideAuto.prototype.make_all_presentation_list(function(presentation_lists){
                  callback(true);
                }, function(response) {
                  callback(false);
                });
                
              });
            }
            catch(err)
            {
              console.log(err.message);
              callback(false);
            }

          });
          
  
  
  
          return;
          
        });
      }

    



      



      

      
    }

    yestoslideAuto.prototype.set_conference_id = function(id)
    {
      current_presentation_conference_id = id;
    }
    yestoslideAuto.prototype.set_current_image_size = function(imagesize)
    {
      current_presentation_image_size = imagesize;
    }
    yestoslideAuto.prototype.get_current_image_size = function()
    {
      return current_presentation_image_size;
    }
    yestoslideAuto.prototype.set_conference_name_and_desc = function (name,desc,id,server_needed=false,alarm_enabled=false)
    {

      
      console.log("set_conference_name_and_desc" , server_needed);
      current_presentation_conference_name = name;
      current_presentation_explanation = desc;
      current_presentation_conference_id = id;
      current_presentation_server_needed = server_needed;
      current_presentation_alarm_enalbed = alarm_enabled;
      
      

      
      console.log(current_presentation_conference_name,current_presentation_explanation,current_presentation_conference_id,current_presentation_server_needed);
      //alert(current_presentation_conference_id);
    }

    yestoslideAuto.prototype.get_conference_name = function(){

      return current_presentation_conference_name;
    };

    yestoslideAuto.prototype.get_conference_id = function(){

      return current_presentation_conference_id;
    };


    yestoslideAuto.prototype.update_explanation = function()
    {
      

      
      console.log("coordi needed",current_presentation_server_needed);
      //var user = window.gapi.auth2.getAuthInstance().currentUser.get();
      //var profile = user.getBasicProfile();
      
      
      
      var u = window.get_currentUser();
      var email_hash = window.sha256(u.email);
         
      var expire_date = new Date();
      expire_date.setDate(expire_date.getDate() + 10000);
      expire_date = expire_date.getTime();
      console.log(current_presentation_explanation,current_presentation_conference_name,current_presentation_conference_id);
      var explanation_info ={
        coordi_needed:current_presentation_server_needed,
        explanation:current_presentation_explanation,
        conference_name:current_presentation_conference_name,
        conference_id:current_presentation_conference_id,
        latitude:1,
        altitude:3,

        coordiEmail:u.email,
        coordiName:current_profile.name,
        coordiProfile:current_profile.picture,
        createTime:window.firebase.database.ServerValue.TIMESTAMP,
        days:10000,
        expire_date:expire_date,
        image_size:window.sunny.get_current_image_size()
       
      }
      console.log(explanation_info);
      console.log(email_hash);
      console.log('thisisneverthat/current_slides/' + email_hash+'/' +get_photoID_hash()+ '/with_clients/explanations/data');
      yestoslideAuto.prototype.set_stopped_collecting(false);
      
      window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/with_clients/explanations/data').update(explanation_info);
      
      window.document.getElementById("main_iframe").contentWindow.document.getElementById("present_name").innerHTML = current_presentation_conference_id  ;

      window.sunny_prev_decks.set_current_desc_info(explanation_info);

      window.sunny_prev_decks.update_desc(window.sunny.get_current_presentationID(),window.sunny.get_current_original_presentationID(),function(rst){
        console.log(rst);
      });

      
      window.sunny_search.set_new_session(explanation_info);


      

    }
    yestoslideAuto.prototype.createNewSlides_for_original = function(callback)
    {
      
      console.log("coordi needed",current_presentation_server_needed);
      var d = new Date();
      var parentId =  yestoslide_temporaryFolderId;
      parentId = window.sunny.get_current_conference_folderID();
      var email = coordinator_email;
      
      var slides_name = d.YYYYMMDDHHMMSS()+"_original";
      slides_name = created_presentaion_name+"_original";;
      var info = window.sunny.get_photoId_info();
      slides_name = info.conference_id +"_"+email;

      console.log(slides_name, parentId,email);
     
        this.create_slides_by_yestoslide(slides_name, parentId,email,function(slidesId){
          console.log(slidesId);
          if(slidesId =="")
          {
            callback(false);
            return;
          }

          window.sunny.add_email_to_sharedLink(slidesId,"yestoslide@gmail.com",function(rst){
            console.log(rst);
          });
          
          current_orignial_slides_id = slidesId;
          if(window.sunny.is_original_slide_only())
          {
            current_slides_id = current_orignial_slides_id;
          }
          var u = window.get_currentUser();
          console.log(u);
          var email_hash = window.sha256(u.email,u.displayName);
         
          //var user = window.gapi.auth2.getAuthInstance().currentUser.get();
          //console.log(user);
          //var profile = user.getBasicProfile();
          
          //console.log(profile);
          var ct = (new Date()).getTime();
          
          var expire_date = new Date();
          expire_date.setDate(expire_date.getDate() + 10000);
          expire_date = expire_date.getTime();

          
          var explanation_info ={
            coordi_needed:current_presentation_server_needed,
            explanation:current_presentation_explanation,
            conference_name:current_presentation_conference_name,
            conference_id:current_presentation_conference_id,
            alarm_enabled:current_presentation_alarm_enalbed,
            latitude:1,
            altitude:3,
            coordiEmail:u.email,
            coordiName:current_profile.name,
            coordiProfile:current_profile.picture,
            createTime:ct,
            days:10000,
            active:false,
            expire_date:expire_date,
            image_size:sunny.get_current_image_size()

          }

          console.log(explanation_info);

          
          /*
          window.sunny_slides_sheets.add_explanation_to_personal_database_using_slides(explanation_info,function(rst){
            console.log(rst);
              
          });
          */
          window.sunny_prev_decks.set_current_desc_info(explanation_info);

          

          console.log('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/with_clients/');
          window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/with_clients/').update({
              original_slideId:current_orignial_slides_id,
              slideId:current_orignial_slides_id,
              title:created_presentaion_name
              
          });
         
         
          var desc = {
            conference_name:current_presentation_explanation,
            explanation:current_presentation_explanation
          }
          console.log(explanation_info);
          var myDesc = JSON.stringify(explanation_info);

          console.log(myDesc);
          var body = {'description': myDesc};
          var request = gapi.client.drive.files.patch({
            'fileId': current_orignial_slides_id,
            'resource': body
          });
          console.log(body);
          request.execute(function(resp) {
            console.log(resp);
            console.log('New description: ' + resp.description);

            console.log("current_slides_id",current_slides_id);
            var request = gapi.client.drive.files.patch({
              'fileId': current_slides_id,
              'resource': body
            });
            request.execute(function(resp) {
              console.log(resp);
              console.log('New description: ' + resp.description);
              console.log('New description: ' + resp);
              
              window.sunny_prev_decks.get_current_desc_from_firebase(function(rst){
                console.log(rst);
                window.sunny_prev_decks.set_current_desc_info(rst);
                console.log("timer will start in 1 sec");
                
                setTimeout(() => {
                  window.sunny_prev_decks.check_description_inside_deck();  



                  callback(true);

                }, 1000);
                
                
              });
              
              
            });
          });


          //yestoslideAuto.prototype.set_stopped_collecting(false);

          console.log('thisisneverthat/current_slides/' + email_hash+'/' +get_photoID_hash()+ '/with_clients/explanations/data/');
          
          console.log(explanation_info);
          window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/with_clients/explanations/data/').update(explanation_info);

          
          //window.sunny_search.set_new_session(explanation_info);

         
        })
        return;
       
       

    
    };
    yestoslideAuto.prototype.make_anyone_reader = function(fid,callback)
    {

        //alert("make_anyone_reader");
               

        var request = window.gapi.client.request({
                path : '/drive/v3/files/'+fid+'/permissions',
                method : 'post',
                body : {
                'value' : 'anyone',
                'type' : 'anyone',
                'role' : 'reader',
                
                }
                }).then(function(driveResponse)  {
                    callback(true);
            
            }, function(response) {
            callback(false);
        });
    };

    yestoslideAuto.prototype.remove_a_slide = function(presentationId,slideId,callback) {
        //https://docs.google.com/presentation/d/1IIY5v2vLEftxU3slOy41BZJjoOskIVJtL52sWNIB7N0/edit#slide=id.p
        return window.gapi.client.slides.presentations.batchUpdate({
          "presentationId": presentationId,
          "resource": {
            "requests": [
              {
                "deleteObject": {
                  "objectId": slideId
                }
              }
            ]
          }
        })
        .then(function(response) {
          // Handle the results here (response.result has the parsed body).
          console.log("Response", response);
          callback(true);
        },
        function(err) {
            console.error("Execute error", err); 
            callback(false);
        });
    }

    yestoslideAuto.prototype.changeParents_for_main_presentation = function( fileId,previousParents,newfolderId ){
       
      
        console.log("fileId,previousParents,newfolderId ",fileId,previousParents,newfolderId);
        window.gapi.client.drive.files.update({
          'fileId': fileId,
            'addParents': newfolderId,
            'removeParents': previousParents
        })
        .then((res) => {
           //console.log(res);
           //remove_last_slide();
      
           yestoslideAuto.prototype.get_first_slideID(fileId,function(lastSlideID){
            //console.log(lastSlideID);
            if(lastSlideID != "")
            {
                yestoslideAuto.prototype.remove_a_slide(fileId,lastSlideID,function(rst){
                //console.log(rst);
                if(rst)
                {
                  console.log("remove success");
      
                }
                else
                {
                  console.log("remove fail");
                }
              })
            }
            else
            {
              console.log("no slide to remove");
            }
              
          });
      
      
      
      
        });
    };
      
    yestoslideAuto.prototype.get_slidesIDs = function(presentationId,callback)
    {
      var slideObjectIds = [];
      //https://docs.google.com/presentation/d/1IIY5v2vLEftxU3slOy41BZJjoOskIVJtL52sWNIB7N0/edit#slide=id.p
      return window.gapi.client.slides.presentations.get({
        "presentationId": presentationId
      
      }).then(function(response) {
        
          if(typeof response.result.slides ==="undefined")
          {
            callback(slideObjectIds);
            return;
          }
    
          response.result.slides.forEach((slide) => {slideObjectIds.push(slide.objectId)});
          //console.log(slideObjectIds);
          callback(slideObjectIds);
        },
        function(err) {
            console.error("Execute error", err); 
            callback(slideObjectIds);
      });
    };

    yestoslideAuto.prototype.get_first_slideID = function(presentationId,callback)
    {
    
        yestoslideAuto.prototype.get_slidesIDs(presentationId,function(slideIds){
            //console.log(slideIds);
            if(slideIds.length >0)
            {
                callback(slideIds[0]);
        
            }
            else
                callback("");
        });
    


    
    
    };


    
    yestoslideAuto.prototype.create_personal_database =function(callback)
    {
      var url = apps_script_link_for_history;
      console.log(url);
              
      var http = new XMLHttpRequest();

      //var parentFolder =e.parameters.create_spreadSheet_for_history.toString();
      //var parti_email = e.parameters.parti_email.toString();
      //var header = e.parameters.header.toString();
      //var header_message = e.parameters.header_message.toString();
      //var current_header_history_presentations= "PresentationID,OriginPresent,CreateTime,ConferenceName,ConferenceExplain,CoordiEmail,CoordiName,CoordiProfileImage";
      //var current_header_history_messages= "PresentationID,SlideId,Comment,Altitude,Latitude,Kind";
  
      var u = window.get_currentUser();
      var params = "create_spreadSheet_for_history=" + current_history_folderId+"&parti_email="+u.email +"&header="+current_header_history_presentations+"&header_message="+current_header_history_messages;

      //var params = info ;
      console.log(params);
     
      //"imgLink="+newly_uploaded_fileId+"&deckId="+current_slides_id;

      
      http.open("POST", url, true);

      //Send the proper header information along with the request
      http.setRequestHeader("Content-type", "application/x-www-form-urlencoded;");

      //Call a function when the state changes.
      http.onreadystatechange = function() {
          if (http.readyState==4) {
          
            console.log(http.responseText);
            if(http.responseText.indexOf("error:") != -1)
              callback(false);
            else
              callback(true);

            
            
          
          }
      } // end callback

      http.send(params);
    }


    
    yestoslideAuto.prototype.add_explanation_to_personal_database =function(explanation,callback)
    {
      
      var url = apps_script_link_for_history;
      console.log(url);
              
      var http = new XMLHttpRequest();

      //PresentationID,OriginPresent,CreateTime,Altitude,Latitude,ConferenceName,ConferenceExplain,CoordiEmail,CoordiName,CoordiProfileImage"     
     
      var u = window.get_currentUser();
  
      
      console.log(explanation);
      var photoUrl = "";
      try
      {
        photoUrl = u.photoURL;
      }
      catch(err)
      {

      }

      var explanations = {
        ConferenceID:window.sunny.get_conference_id(),
        PresentationID: current_slides_id,
        OriginPresent:current_orignial_slides_id,
        CreateTime : explanation["createTime"],
        Altitude : explanation["altitude"],
        Latitude:explanation["latitude"],
        ConferenceName:explanation["conference_name"],
        ConferenceExplain:explanation["explanation"],
        CoordiEmail: explanation["coordiEmail"], 
        CoordiName: explanation["coordiName"],
        //CoordiProfileImage  : explanation["coordiProfile"],
        CoordiProfileImage  : photoUrl,
        PartiEmail :u.email
      };

      
      console.log(explanations);

      //alert(explanation["conference_name:"]);
      //altitude: 3
      //explanation: "써니그라피의 ㅇㅇㅇㅇㅇㅇ발표날 10자 이상"
      //latitude: 1
      //"PresentationID,OriginPresent,CreateTime,Altitude,Latitude,ConferenceName,ConferenceExplain,CoordiEmail,CoordiName,CoordiProfileImage",
     
      explanations = JSON.stringify(explanations);
      explanations = encodeURIComponent(explanations);
      //var params = "add_explanation_for_history=" + JSON.stringify(explanation)+"&header="+current_header_history_presentations;
      var params = "add_explanation_for_history=" + explanations+"&header="+current_header_history_presentations;

      //var params = "add_explanation_for_history=" + current_history_folderId+"&explanations="+JSON.stringify(explanation);


      
      console.log(params);
      //callback(explanation);
      //return;
     
      
      http.open("POST", url, true);

      
      http.setRequestHeader("Content-type", "application/x-www-form-urlencoded;");

      
      http.onreadystatechange = function() {
          if (http.readyState==4) {
          
            console.log(http.responseText);
            callback(http.responseText);

            
            
          
          }
      } // end callback

      http.send(params);
    }; 

    yestoslideAuto.prototype.add_audience_to_history_in_firebase = function(explanations,callback){
      
            
      console.log(explanations);
      
      
      var email_hash = window.sha256(this.getCoordinatorEmail());

      console.log("add_audience_to_history_in_firebase",'thisisneverthat/for_history/'+email_hash);
      window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/with_clients/').once("value", function(snapshot){
        
        
        if(snapshot.val() != null) 
        {

          yestoslideAuto.prototype.set_current_presentation_info(snapshot.val().slideId,snapshot.val().original_slideId, snapshot.val().title);
          console.log(snapshot.val());
          //yestoslideAuto.prototype.set_coordinator_collecting(true);

          search_wsheet = "Presentations";
          var searchColumns = "PresentationID";
          var searchInput  = snapshot.val().slideId;
          var searchWords = searchInput.split(/\s+/);
          searchColumns = searchColumns.split(",");
          console.log("searchInput",searchInput);
          console.log("searchWords",searchWords);

          var resulsArray = searchInput === ""?[] : searchData_history_presentations.filter(function(r){

          
            return searchWords.every(function(word){
          
              return searchColumns.some(function(colIndex){
                //console.log(r[colIndex].toString() ," vs  "  ,word );
                return r[colIndex].toString().indexOf(word) !== -1;
              });
            });
          
          });
          console.log(resulsArray);
          if(resulsArray.length == 0)
          {
            console.log("add new record to presentaions")
            yestoslideAuto.prototype.create_personal_database(function(rst){
              if(!rst)
              {
                 console.log(rst);
                 alert("fail to create personal database");
                 callback(true);
      
              }
              else
              {
                yestoslideAuto.prototype.add_explanation_to_personal_database(explanations,function(rst){
                  console.log(rst);
                  callback(true);
                  
                });
              }
             
              
             
              
            });
          }

          return;

          window.firebase.database().ref('thisisneverthat/for_history/'+email_hash +"/"+snapshot.val().slideId).once("value", function(snapshot_history){
            if(snapshot_history.val() == null) {
              window.firebase.database().ref('thisisneverthat/for_history/'+email_hash +"/"+snapshot.val().slideId).update(explanations);
              yestoslideAuto.prototype.create_personal_database(function(rst){
                if(!rst)
                {
                   console.log(rst);
                   alert("fail to create personal database");
                   return;
        
                }
                else
                {
                  yestoslideAuto.prototype.add_explanation_to_personal_database(explanations,function(rst){
                    console.log(rst);
                    
                    
                  });
                }
               
                
               
                
              });
              
            }
           
            callback(true);
          });
          
        }
        else
        {
          callback(true);
        }
        
      });
      
      
    };
    yestoslideAuto.prototype.add_email_to_sharedLink_XMLHttpRequest = function(email, fileID,callback)
    {

      
      
      //https://docs.google.com/spreadsheets/d/15ObU-T8AOoxsecbc2RtTDoo8KVlUmv5WwIw1NWe0wZ0/edit?usp=sharing
      //var current_header = "ID,CreateTime,Comment";
          
         
          var url = apps_script_link_for_email;
          //console.log(url);
              
          var http = new XMLHttpRequest();
   
       
       
          var params = "addEmailTo=" + email+"&fileID="+fileID ;

          //var params = info ;
          //console.log(params);
          //"imgLink="+newly_uploaded_fileId+"&deckId="+current_slides_id;
  
          
          http.open("POST", url, true);
  
          //Send the proper header information along with the request
          http.setRequestHeader("Content-type", "application/x-www-form-urlencoded;");
  
          //Call a function when the state changes.
          http.onreadystatechange = function() {
              if (http.readyState==4) {
              
                console.log(http.responseText);
                
                //if(http.responseText=="added")
                  callback(true);
                //else
                //  callback(false);

                
               
              
              }
          } // end callback
  
          http.send(params);
    };

    yestoslideAuto.prototype.add_email_to_ReaderSharedLink =function(fileId,email,callback)
    {
     
      console.log(fileId,email);
    
      window.gapi.client.load('drive','v2', function(){
        var request = window.gapi.client.drive.permissions.insert({
          fileId: fileId,
          sendNotificationEmails: false,
          resource: {
              value:email,
              type:"user",
              role:"reader"
          }
        }).then((response) => {
              //console.log(response.result.spreadsheetId);
              console.log( response );
              
              callback(true); 
        }).catch(function(error) {
            console.log("fail",error);
            callback(false); 
        });
      });
    
     
    };
    yestoslideAuto.prototype.add_email_to_sharedLink =function(fileId,email,callback)
    {
     
      console.log(fileId,email);
    
      window.gapi.client.load('drive','v3', function(){

        
       
        

        gapi.client.drive.permissions.create({
          "fileId": fileId,
          "sendNotificationEmail": false,
          "resource": {
            "role": "writer",
            "type": "user",
            "emailAddress": email
          }
        }).then((response) => {
            //console.log(response.result.spreadsheetId);
            console.log( response );
            
            callback(true); 
          }).catch(function(error) {
              console.log("fail",error);
              callback(false); 
          });

        
     
      

      

      
    });

      return;
      window.gapi.client.load('drive','v2', function(){

        
       
          var request = gapi.client.drive.permissions.list({
            'fileId': fileId,
            'fields': "*"
          });
          request.execute(function(resp) {
            console.log(resp);
            
            if(typeof resp.items != "undefined")
            {
  
              for(var i =0; i < resp.items.length;i++)
              {
                if(resp.items[i].emailAddress ==email && resp.items[i].role =="writer" )
                {
                  callback("alread exists in permissions list");
                  return;
                }
              }
  
            }
            else if(typeof resp.permissions != "undefined")
            {
              for(var i =0; i < resp.permissions.length;i++)
              {
                if(resp.permissions[i].emailAddress ==email && resp.permissions[i].role =="writer" )
                {
                  callback("alread exists in permissions list");
                  return;
                }
              }
            }
            
  
            gapi.client.drive.permissions.insert({
              fileId: fileId,
              sendNotificationEmails: false,
              resource: {
                emailAddress:email,
                  type:"user",
                  role:"writer"
                }
            }).then((response) => {
              //console.log(response.result.spreadsheetId);
              console.log( response );
              
              callback(true); 
            }).catch(function(error) {
                console.log("fail",error);
                callback(false); 
            });
  
          });
       
        

        

        
      });
    
     
    };


    yestoslideAuto.prototype.add_new_ws = function(ws_name)
    {

      console.log("disable add_new_ws");
        return;
        var url = apps_script_link_for_sheets;
        
            
        var http = new XMLHttpRequest();

        var d = new Date();
        
        ws_name = encodeURIComponent(ws_name);
        var params = "insertSheet=" + current_spreadSheetId+"&new_name="+ws_name+"&header="+current_header;

        //var params = info ;
        console.log(params);
        //"imgLink="+newly_uploaded_fileId+"&deckId="+current_slides_id;

        
        http.open("POST", url, true);

        //Send the proper header information along with the request
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded;");

        //Call a function when the state changes.
        http.onreadystatechange = function() {
            if (http.readyState==4) {
            
            console.log(http.responseText);
            
            var u = window.get_currentUser();
                    //console.log(u);
            var email_hash = window.sha256(u.email);
            
            current_sheet_name = ws_name;
            window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/with_clients_sheets/').set({
                sheetsId:current_spreadSheetId,
                tab_name:current_sheet_name,
                title:current_spreadsheet_name
            });
            
            
            }
        } // end callback

        http.send(params);
    };

    yestoslideAuto.prototype.change_sheet_name = function()
    {
        var url = apps_script_link_for_sheets;
        
        console.log(url);
        var http = new XMLHttpRequest();

        var d = new Date();
        
        current_sheet_name = encodeURIComponent(d.YYYYMMDDHHMMSS());
        var params = "change_sheetName=" + current_spreadSheetId+"&new_name="+current_sheet_name+"&header="+current_header;

        //var params = info ;
        console.log(params);
        //"imgLink="+newly_uploaded_fileId+"&deckId="+current_slides_id;

        
        http.open("POST", url, true);

        //Send the proper header information along with the request
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded;");

        //Call a function when the state changes.
        http.onreadystatechange = function() {
            if (http.readyState==4) {
            
            console.log(http.responseText);
            
            var u = get_currentUser();
                    //console.log(u);
            var email_hash = window.sha256(u.email);
            
            window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/with_clients_sheets/').set({
                sheetsId:current_spreadSheetId,
                tab_name:current_sheet_name,
                title:current_spreadsheet_name
            });
            
            
            }
        } // end callback

        http.send(params);
    };


    yestoslideAuto.prototype.create_sheet =function(parent_folder_id,callback)
    {
        
      callback(true);
      return;
        console.log("***create_sheet", parent_folder_id);
        var d = new Date();
        var spreadsheet_name = d.YYYYMMDDHHMMSS();
        console.log(spreadsheet_name);
    
    
        var body= {
            "name": spreadsheet_name, 
            "mimeType": "application/vnd.google-apps.spreadsheet",
            "parents": [yestoslide_database_FolderId]
        }

        window.gapi.client.request({
            'path': 'https://www.googleapis.com/drive/v3/files/',
            'method': 'POST',
            'body': body
        }).then(function(response,rawResp) {
            //console.log(response);
            current_spreadSheetId = response.result.id;



            var u = window.get_currentUser();
                    //console.log(u);
            var email_hash = window.sha256(u.email);

            window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/with_clients_sheets/').set({
                sheetsId:current_spreadSheetId,
                title:current_spreadsheet_name
            });

            
            yestoslideAuto.prototype.add_email_to_sharedLink(current_spreadSheetId,"yestoslide@gmail.com",function(rst){
                yestoslideAuto.prototype.change_sheet_name();
                callback(true);
            });
            
            
        }, function(response) {

            alert("faile to create spreadsheet");
            callback(false);
        });
    

    };


    yestoslideAuto.prototype.check_deck_exist = function(deckId,callback)
    {

      console.log(deckId);
      yestoslideAuto.prototype.listFiles_with_parent(yestoslide_temporaryFolderId,function(files){
          
        console.log(files);
        for(var i = 0; i <files.length;i++)
        {
          console.log(files[i].id);
          if(files[i].id == deckId)
          {
            try
            {
              current_present_desc = JSON.parse(files[i].description);
              console.log(current_present_desc);
              window.sunny_prev_decks.update_present_name_in_screen();
              //window.document.getElementById("main_iframe").contentWindow.document.getElementById("present_name").innerHTML = current_present_desc.conference_name +"-"+current_present_desc.explanation;
            }
            catch(err)
            {
              console.log(err.message);

            }
            
            console.log("deck exist",deckId);
            callback(true);
            return;
          }
        }
        console.log("deck not exist",deckId);
        callback(false);

      });
      

      return;

      callback(true);
      return;
      var request = gapi.client.drive.files.get({
        'fileId': deckId,
        //'q': 'trashed = false',
        'fields': 'parents'
        });
        request.execute(function(resp) {
          console.log(resp);
          if(resp.parents.length ==0)
          {
            callback(false);
          }
          else
          {
            callback(true);
          }
        });
        return;

        

    
    };

    var searchData =[];
    yestoslideAuto.prototype.load_spreadsheet = function(callback)
    {

      searchData = [];
      callback([]);
      return;
      //https://docs.google.com/spreadsheets/d/15ObU-T8AOoxsecbc2RtTDoo8KVlUmv5WwIw1NWe0wZ0/edit?usp=sharing

          console.log("load_spreadsheet");
         
          var start_row = 1;
          var start_col = 1;
          var row_cnt = 1110;
          var col_cnt = 6;
          var url = apps_script_link_for_sheets;
          
              
          var http = new XMLHttpRequest();
   
          var params = "getAllData="+ current_spreadSheetId +"&ws="+current_sheet_name +"&sr="+start_row +"&sc="+start_col +"&nr="+row_cnt +"&nc="+col_cnt ;
          console.log(params);
          //"imgLink="+newly_uploaded_fileId+"&deckId="+current_slides_id;
  
          http.open("POST", url, true);
  
          //Send the proper header information along with the request
          http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  
          //Call a function when the state changes.
          http.onreadystatechange = function() {
              if (http.readyState==4) {
              
                //console.log(http.responseText);
                searchData = http.responseText;
                
                searchData =  JSON.parse( searchData);
                
                if(searchData.length > 0)
                {
                  
                  if(typeof searchData[0].error !== "undefined")
                  {

                    //alert("error" + searchData[0].error);
                    searchData = [];
                    callback(searchData);
                  }
                  else
                  {
                    
                    console.log("end of load spreadsheet do process result");
                    //console.log("searchData ",searchData);
                    callback(searchData);
                  }
                }
                else
                {
                  searchData = [];
                 // alert("no data");
                 callback(searchData);
                }
               
              
              }
          } // end callback
  
          http.send(params);
    }
    var searchData_history_presentations =[];
    var searchData_history_messags =[];
    var search_wsheet = "Presentations";

    yestoslideAuto.prototype.remove_one_item_from_history_presentations = function(conferencePresent)
    {
      console.log(searchData_history_presentations);
      console.log(searchData_history_presentations.length);
      for(var i = 0; i <searchData_history_presentations.length; i++)
      {
        //console.log(searchData_history_presentations[i].PresentationID);
        if(conferencePresent == searchData_history_presentations[i].PresentationID)
        {
          console.log("found");
          searchData_history_presentations.splice(i, 1);
          break;
        }
      }
      console.log(searchData_history_presentations.length);

    };
    yestoslideAuto.prototype.get_searchData_history_presentations =function()
    {
      //console.log(searchData_history_presentations);
      return searchData_history_presentations;
    }

    var contenturl_status = {};

    yestoslideAuto.prototype.get_contenturl_status = function()
    {
      return contenturl_status;
    }
    yestoslideAuto.prototype.do_get_contenturl_concurrently =function(index,presentId,callback){
      var slideId = window.sunny.find_slideId_using_list_img(presentId);
        
      if(slideId != "")
      {
        //console.log(slideId);
        window.sunny_images.getThumbnail(presentId,slideId,function(contenturl){

          contenturl_status[presentId] = contenturl.replace("s800","s200");;
          console.log(contenturl);
          if(contenturl != "")
          {
            //console.log(i);
            searchData_history_presentations[index].contentUrl = contenturl.replace("s800","s200");
            
          }
          callback(contenturl);

          
            
        });
        
        
        
      }
      else
      {
        callback("");
      }
    };

    var ongoing_gather_contentUrls =true;

    yestoslideAuto.prototype.gather_contentUrls = function()
    {
      return;
      contenturl_status = {};
      //onsole.log(searchData_history_messags);
      //return;
      //sunny_modal.show_spinner("gather contenturl");
      //console.log(searchData_history_presentations);
      

      var total_cnt = searchData_history_presentations.length;
      for(var i = 0; i < searchData_history_presentations.length;i++)
      {
        window.sunny.do_get_contenturl_concurrently(i,searchData_history_presentations[i].OriginPresent,function(contenturl){
          total_cnt--;
          console.log(total_cnt,contenturl);
          if(total_cnt ==0)
          {
            //window.sunny_modal.hide_spinner();
          }
        });

      }
      

      return;
      if(searchData_history_presentations.length ==0)
      {
        window.sunny_modal.hide_spinner();
        ongoing_gather_contentUrls =false;
        return;
      }
      var ongoing= false;
      var i = 0;
      var timer = setInterval(() => {
      
        //console.log(i+1,searchData_history_presentations.length);
        if(searchData_history_presentations.length ==(i+1))
        {
          window.sunny_modal.hide_spinner();
          ongoing_gather_contentUrls =false;
          //console.log(searchData_history_presentations);
          clearInterval(timer);
          return;
        }
        
        if(ongoing)
        {
          return;
        }


        ongoing  = true;

        
        var slideId = window.sunny.find_slideId_using_list_img(searchData_history_presentations[i].OriginPresent);
        
        if(slideId != "")
        {
          //console.log(slideId);
          window.sunny_images.getThumbnail(searchData_history_presentations[i].OriginPresent,slideId,function(contenturl){

            console.log(contenturl);
            if(contenturl != "")
            {
              //console.log(i);
              searchData_history_presentations[i].contentUrl = contenturl.replace("s800","s200");
              //console.log(searchData_history_presentations);
              //console.log(searchData_history_presentations[i]);
              
            }

            i++;
            ongoing =false;
              
          });
          
          
          
        }
        else
        {
          i++;
            ongoing =false;
        }


      }, 100);
      
    }
    yestoslideAuto.prototype.get_history_messags = function()
    {
      return searchData_history_messags;
    }
    yestoslideAuto.prototype.set_searchdata_history = function (presents,messages)
    {
      searchData_history_presentations = presents.slice();
      console.log(searchData_history_presentations);
      for(var i  =0; i < searchData_history_presentations.length; i++)
      {
        //console.log(searchData_history_presentations[i].ConferenceID);
        if(searchData_history_presentations[i].ConferenceID =="" || typeof searchData_history_presentations[i].ConferenceID ==="undefined")
        {
          searchData_history_presentations[i].ConferenceID ="`%";
        }
      }
      //console.log(searchData_history_presentations);
      searchData_history_messags = messages.slice();
    }

    yestoslideAuto.prototype.load_history= function(callback)
    {
      sunny.get_apps_script_url(function(rst){
        sunny_modal.show_spinner("행사 데이터 로딩");
        sunny.load_spreadsheet_for_history("Presentations",function(data){
          
          //console.log(data);
          var presents =  JSON.parse(data);
          
          if(presents.length > 0)
          {
            
            if(typeof presents[0].error !== "undefined")
            {

              //alert("error" + searchData[0].error);
              presents = [];
              sunny.set_searchdata_history([],[]);
              callback(true);
              
            }
            else
            {
              sunny_modal.show_spinner("메시지 데이터 로딩");
              sunny.load_spreadsheet_for_history("Messages",function(data){
                var messages =  JSON.parse(data);
          
                if(messages.length > 0)
                {
                  
                  if(typeof messages[0].error !== "undefined")
                  {

                    //alert("error" + searchData[0].error);
                    messages = [];
                    //presents = [];
                    sunny.set_searchdata_history(presents,[]);
                    callback(false);
                    
                  }
                  else
                  {
                    console.log(presents,messages);
                    sunny.set_searchdata_history(presents,messages);
                    callback(true);
                  }
                }
                else
                {
                  messages = [];
                  //presents = [];
                  sunny.set_searchdata_history(presents,[]);
                  callback(true);
                }

                console.log("do process result for history");
              });
              
              
            }
          }
          else
          {
            presents = [];
            // alert("no data");
            sunny.set_searchdata_history([],[]);
            callback(true);
          }
             

        });    

      });
    }

    yestoslideAuto.prototype.get_current_search_sheet = function()
    {
      return search_wsheet;
    }
    yestoslideAuto.prototype.set_current_search_sheet = function(criteria)
    {
      if(criteria =="messages from photo")
        search_wsheet = "Messages";
      else  if(criteria =="event description")
        search_wsheet = "Presentations";
      else  if(criteria =="Coordinator Gmail")
        search_wsheet = "Presentations";  
      else  if(criteria =="period")
        search_wsheet = "Presentations";
      else if(criteria =="eventID") 
        search_wsheet = "Presentations";
      else
        search_wsheet = "Presentations";
      
      



      console.log(search_wsheet);
    }
    yestoslideAuto.prototype.find_from_history = function(sInput,search_mode, tmp_current_search_mode="", callback)
    {

      console.log("tmp_current_search_mode",tmp_current_search_mode);
      console.log("sInput" ,sInput);
      console.log("search_mode",search_mode);
      console.log("search_wsheet",search_wsheet);
      //console.log(searchData_history_presentations);
      //console.log(searchData_history_messags);
      
      console.log("search_wsheet",search_wsheet);
      
      var searchColumns = "";
      var searchInput = sInput;

      if(tmp_current_search_mode != "")
      {
        search_mode = "eventID";
      }
      
      if(search_wsheet =="Presentations")
      { 
        if(search_mode == "eventID")
        {
          searchColumns = "ConferenceID";
        }
        else if(search_mode == "Coordinator Gmail")
        {
          searchColumns = "CoordiEmail";
        }
        else if(search_mode == "event description")
        {
          searchColumns = "ConferenceExplain";
        }
        else
          searchColumns = "ConferenceExplain";
      }
      else if(search_wsheet =="Messages")
      {
        searchColumns = "Comment";
      }
      
      console.log(searchColumns);
      
      var searchWords = searchInput.split(/\s+/);
      searchColumns = searchColumns.split(",");

      if(search_wsheet =="Presentations")
      {
        var resulsArray = [];
        if(search_mode =="AllConference" || search_mode =="eventID" || true)
        {
          
          resulsArray = searchData_history_presentations.filter(function(r){

       
            return searchWords.every(function(word){
              return searchColumns.some(function(colIndex){
                //console.log(r[colIndex]);
                //console.log(r[colIndex].toString() ," vs  "  ,word );
                
                return r[colIndex].toString().indexOf(word) !== -1;
              });
            });
           
          });
        }
        else
        {
          resulsArray = searchInput === ""?[] : searchData_history_presentations.filter(function(r){

       
            return searchWords.every(function(word){
              return searchColumns.some(function(colIndex){
                //console.log(r[colIndex].toString() ," vs  "  ,word );
                return r[colIndex].toString().indexOf(word) !== -1;
              });
            });
           
          });
        }
     
      }
      else if(search_wsheet =="Messages")
      {
        console.log(searchData_history_messags);
        var resulsArray = searchInput === ""?[] : searchData_history_messags.filter(function(r){

       
          return searchWords.every(function(word){
            return searchColumns.some(function(colIndex){
              //console.log(r[colIndex].toString() ," vs  "  ,word );
              return r[colIndex].toString().indexOf(word) !== -1;
            });
          });
         
        });
      }
      callback(resulsArray);



      
    }

    yestoslideAuto.prototype.find_slideId_using_list_img =function(presentID)
    {
      //console.log(presentID);
      
      
      var found_slideId = "";
      for(var i =0; i < searchData_history_messags.length; i++)
      {
        console.log(presentID,searchData_history_messags[i].OriginPresent);
        if(presentID ==searchData_history_messags[i].OriginPresent )
        {
          console.log(searchData_history_messags[i]);
          found_slideId = searchData_history_messags[i].SlideId_Org;
          return found_slideId;
        }
        
      }
      //console.log("found_slideId",found_slideId);
      return found_slideId;
    }
    yestoslideAuto.prototype.get_presentId_from_message_history = function(sInput, callback)
    {

      
     
      var search_wsheet = "Messages";
      
      var searchColumns = "";
      var searchInput = sInput;
     
      searchColumns = "PresentationID";
      
      console.log(sInput,searchInput);
      var searchWords = searchInput.split(/\s+/);
      searchColumns = searchColumns.split(",");

      if(search_wsheet =="Messages")
      {
        var resulsArray = searchInput === ""?[] : searchData_history_messags.filter(function(r){

       
          return searchWords.every(function(word){
            return searchColumns.some(function(colIndex){
              //console.log(r[colIndex].toString() ," vs  "  ,word );
              return r[colIndex].toString().indexOf(word) !== -1;
            });
          });
         
        });
      }
      callback(resulsArray);



      
    }
    yestoslideAuto.prototype.find_a_specific_presentation_from_history = function(sInput, callback)
    {

      var search_wsheet = "Presentations";
      
      console.log("search_wsheet",search_wsheet);
     
      var searchColumns = "";
      var searchInput = sInput;
      if(search_wsheet =="Presentations")
      {
        searchColumns = "PresentationID";
      }
      
      
      
      var searchWords = searchInput.split(/\s+/);
      searchColumns = searchColumns.split(",");

      if(search_wsheet =="Presentations")
      {
        var resulsArray = [];
        
        {
          resulsArray = searchInput === ""?[] : searchData_history_presentations.filter(function(r){

       
            return searchWords.every(function(word){
              return searchColumns.some(function(colIndex){
                //console.log(r[colIndex].toString() ," vs  "  ,word );
                return r[colIndex].toString().indexOf(word) !== -1;
              });
            });
           
          });
        }
     
      }
  
      callback(resulsArray);

      

      
    }
    yestoslideAuto.prototype.load_spreadsheet_for_history = function(ws_name,callback)
    {
      //https://docs.google.com/spreadsheets/d/15ObU-T8AOoxsecbc2RtTDoo8KVlUmv5WwIw1NWe0wZ0/edit?usp=sharing

      callback("");
      return ;

          
          var url = apps_script_link_for_history;
          
          console.log(url);
          var u = window.get_currentUser();    
          var http = new XMLHttpRequest();
   
          var params = "getAllData_history="+ u.email +"&ws_name="+ws_name;
          console.log(params);
          //"imgLink="+newly_uploaded_fileId+"&deckId="+current_slides_id;
  
          http.open("POST", url, true);
  
          //Send the proper header information along with the request
          http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  
          //Call a function when the state changes.
          http.onreadystatechange = function() {
              if (http.readyState==4) {
              
             
                if(http.responseText.indexOf("error") != -1)
                {
                  //window.sunny_modal.show_alert_only("no data",false);
                }
                else
                  console.log(http.responseText);
                  
                callback(http.responseText)
                
               
              
              }
          } // end callback
  
          http.send(params);
    }
    yestoslideAuto.prototype.add_record_to_spreadsheet = function()
    {
      //https://docs.google.com/spreadsheets/d/15ObU-T8AOoxsecbc2RtTDoo8KVlUmv5WwIw1NWe0wZ0/edit?usp=sharing
      //var current_header = "ID,CreateTime,Comment";
          
          var start_row = 1;
          var start_col = 1;
          var row_cnt = 1110;
          var col_cnt = 6;
          var url = apps_script_link_for_sheets;
          console.log(url);
              
          var http = new XMLHttpRequest();
   
          
          var fileID = encodeURIComponent(document.getElementById("fileID_add").value);
          var contents = encodeURIComponent(document.getElementById("contents_add").value);
          var createTime = encodeURIComponent(document.getElementById("createdTime_add").value);
      
          var params = "add_record=" + current_spreadSheetId+"&ws="+current_sheet_name+"&header="+current_header + "&ID="+fileID +"&Comment="+contents +"&CreateTime="+createTime  +"&Kind=Test" ;

          //var params = info ;
          console.log(params);
          //"imgLink="+newly_uploaded_fileId+"&deckId="+current_slides_id;
  
          
          http.open("POST", url, true);
  
          //Send the proper header information along with the request
          http.setRequestHeader("Content-type", "application/x-www-form-urlencoded;");
  
          //Call a function when the state changes.
          http.onreadystatechange = function() {
              if (http.readyState==4) {
              
                console.log(http.responseText);
                
               
              
              }
          } // end callback
  
          http.send(params);
    }    
    var current_slides_array= [];
    var current_slides_objects= {};
    var current_displayed_slide = "";
    
    yestoslideAuto.prototype.get_next_slideID = function(callback)
    {
      if(current_slides_objects[current_displayed_slide] == (current_slides_array.length-1)) // last one
      {
        callback(-1);
      }
      else
      {
        current_displayed_slide =current_slides_array[current_slides_objects[current_displayed_slide]+1];
        callback(current_displayed_slide);

      }
    }
    yestoslideAuto.prototype.get_prev_slideID = function(callback)
    {
      if(current_slides_objects[current_displayed_slide] == 0) // last one
      {
        callback(-1);
      }
      else
      {

        current_displayed_slide =current_slides_array[current_slides_objects[current_displayed_slide]-1];
        callback(current_displayed_slide);
      }
    }

    yestoslideAuto.prototype.get_current_slideId = function()
    {
      return  current_displayed_slide;
    }
    
    yestoslideAuto.prototype.get_related_slideIds = function(presentationID, mimetype,callback)
    {

      
      console.log("presentationID",presentationID);
      
      if(presentationID =="")
      {
        current_slides_array = [];
        callback([]);
        return;
      }

        current_slides_array  =[];
        current_displayed_slide = "";
        //console.log("presentationID",presentationID);
        window.gapi.client.slides.presentations.get({
        presentationId: presentationID
        }).then(function(response) {
        //console.log(response);
        var presentation = response.result;
        if(typeof presentation.slides ==="undefined" )
        {
          current_slides_array = [];
          callback([]);
          return;
        }
        var length = presentation.slides.length;
        //console.log(length);
        var ids = [];
        for (var i = 0; i < length; i++) {
            var slide = presentation.slides[i];
            
            var slide_exist = false;
            //console.log("slide.pageElements",slide.pageElements);
            if(typeof slide.pageElements !== "undefined")
            {
              for(var j=0; j <slide.pageElements.length; j++)
              {
                if(mimetype =="image")
                {
                    if(typeof slide.pageElements[j].image !== "undefined")
                    {
                    slide_exist =true;
                    
                    }
                }
                else
                {
                    if(typeof slide.pageElements[j].video !== "undefined")
                    {
                    slide_exist =true;
                    
                    }
                }
              }              
            }


            if(slide_exist)
            {
              
              //console.log(slide.objectId); 
              current_slides_objects[slide.objectId] =ids.length;
              ids.push(slide.objectId);
              
            }
            
            
            
        }

        current_slides_array = ids.slice();
        current_displayed_slide = current_slides_array[0];
       
        callback(ids);
        
        
        }, function(response) {
            console.log('Error: ' + response.result);
            current_slides_array =[];
            callback([]);
        });
    };

    /*
    yestoslideAuto.prototype.set_current_subfolder_in_sharing = function(folderId)
    {
      current_subfolder_in_sharing = folderId;
    }

    yestoslideAuto.prototype.get_current_subfolder_in_sharing = function()
    {
      return current_subfolder_in_sharing;
    }
    */


    yestoslideAuto.prototype.set_current_presentation_info = function(prentID,orgPresentId, name)
    {
      current_slides_id = prentID;
      current_slides_name = name;
      current_orignial_slides_id = orgPresentId;
      restored_slides_id = prentID;
    }

    yestoslideAuto.prototype.get_apps_script_link_lecture = function(){
      return apps_script_link_lecture;
    }
    yestoslideAuto.prototype.get_apps_script_link_for_history = function(){
      //SpreadsheetControl-history가 apps script project 이름이다
      return apps_script_link_for_history
    }

    
    yestoslideAuto.prototype.get_apps_script_link_for_sheets = function(){
      return apps_script_link_for_sheets;
    };

    yestoslideAuto.prototype.get_apps_script_link_for_slides_sheets = function()
    {
      return apps_script_link_for_slides_sheets;
    }
    
    yestoslideAuto.prototype.is_voting_stated = function()
    {
      
      return  window.voting_ready;
    }
    yestoslideAuto.prototype.is_coordinator_collecting = function()
    {
      
      return coordinator_is_collecting  && !window.voting_ready;
    }
    yestoslideAuto.prototype.set_coordinator_collecting = function(is_collecting)
    {
      console.log("************set_coordinator_collecting", is_collecting);
      coordinator_is_collecting = is_collecting;
    }
    yestoslideAuto.prototype.get_current_presentation_name = function()
    {
      return current_slides_name;
    };

    yestoslideAuto.prototype.get_current_sheetName = function()
    {
      return current_sheet_name;
    }
    yestoslideAuto.prototype.get_ss_head = function(){
      return current_header;
    }
    yestoslideAuto.prototype.get_current_header_history_messages = function()
    {
      return current_header_history_messages;
    }
    yestoslideAuto.prototype.get_current_presentationID = function()
    {
      return current_slides_id;
    };
    yestoslideAuto.prototype.set_current_presentationID = function(id)
    {
      current_slides_id = id;
    }
    yestoslideAuto.prototype.set_current_original_presentationID = function(id)
    {
      current_orignial_slides_id = id;
    }
    yestoslideAuto.prototype.get_current_spreadsheet = function ()
    {
      return current_spreadSheetId;
    }

    yestoslideAuto.prototype.get_current_sharing_folder = function()
    {
      return sharing_folder;
    };

    yestoslideAuto.prototype.set_current_sharing_folder = function(folder)
    {
      sharing_folder = folder ;
    };
    yestoslideAuto.prototype.get_current_template_folder = function()
    {
      return template_folder;
    };
    
    yestoslideAuto.prototype.get_current_original_presentationID = function()
    {
      return current_orignial_slides_id;
    };

    yestoslideAuto.prototype.get_current_history_folderId = function()
    {
      return current_history_folderId;
    };
    yestoslideAuto.prototype.get_current_invitation_folderId = function()
    {
      return current_invitation_folderId;
      
    };
    yestoslideAuto.prototype.get_current_worksheet = function()
    {
      return current_sheet_name;
    };

    yestoslideAuto.prototype.set_current_worksheet = function(ws)
    {
      current_sheet_name = ws;
    };

    
    var first_time_get_previous_main_deck = true;
    yestoslideAuto.prototype.is_first_time_get_previous_main_deck = function()
    {
      return first_time_get_previous_main_deck;
    };
    yestoslideAuto.prototype.set_first_time_get_previous_main_deck =function(is_first)
    {
      first_time_get_previous_main_deck = is_first;
    };
    yestoslideAuto.prototype.get_previous_main_deck = function(callback)
    {

      console.log("get_previous_main_deck");
    
        //document.getElementById("sunny_spinner").classList.remove("d-none");
        var u = window.get_currentUser();
        var email_hash = window.sha256(yestoslideAuto.prototype.getCoordinatorEmail());
        //console.log(email_hash);
        window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/with_clients/').once("value", function(snapshot){
        
            
            if(snapshot.val() != null && !window.sunny_prev_decks.is_history_deck_opened())    
            {
              
              window.sunny_slides_sheets.eixst_both_presents_v3(snapshot.val().slideId,snapshot.val().original_slideId,window.sunny.get_yestoslide_temporaryFolderId(), function(both_exist){
                console.log("both_exist",both_exist);
                if(both_exist)
                {
                  
                    console.log("prsentation ID exist ",snapshot.val().slideId,snapshot.val().original_slideId);
                    
                      if(true)
                      {
                        restored_slides_id = snapshot.val().slideId;
                        current_slides_id = snapshot.val().slideId;
                        current_slides_name = snapshot.val().title;
                        current_orignial_slides_id = snapshot.val().original_slideId;
                        window.sunny_images.set_folderId_inSharing_folder(snapshot.val().subfolder_in_sharing);
  
  
                        if(!yestoslideAuto.prototype.is_controller())
                        {
                          
                          window.sunny_prev_decks.get_current_desc_from_firebase(function(desc){
                            if(desc.conference_name != "")
                            {
                                yestoslideAuto.prototype.set_collecting_flag(true);
                                window.document.getElementById("main_iframe").contentWindow.just_change_collecting_btn(true);
                            }
                            else
                            {
                                window.sunny.set_unused_presentation_ready(true);
                                yestoslideAuto.prototype.set_collecting_flag(false);
                                window.document.getElementById("main_iframe").contentWindow.just_change_collecting_btn(false);
                            }
    
                            try
                            {
                                window.document.getElementById("restored_slides_id").innerHTML = snapshot.val().title;
                                
                            }
                            catch(err)
                            {
    
                            }
                            
                            
    
                            callback(true);
    
                          });
                        }
                        else
                        {
                          callback(true);
                        }

                         
                          
                          
  
                          
                      } 
                   
                  
                }
                else
                {
                  alert("not exists slides");
                  window.sunny_slides_sheets.move_to_history(snapshot.val().slideId,snapshot.val().original_slideId,function(rst){
                    window.location.reload();
                  })
                }

              })
                

            }
            else
            {

              if(yestoslideAuto.prototype.is_controller())
              {
                callback(true);
                return;
              }

              window.sunny_slides_sheets.has_any_deck_in_temporary(function(exists){
                if(exists)
                {
                  window.sunny_slides_sheets.delete_temporary_folder(function(rst){
                    console.log(rst);
                    window.location.reload();

                  });

                }
                else
                {
                  console.log("여기111");
              
                  console.log("yestoslideAuto.prototype.is_first_time_get_previous_main_deck()",yestoslideAuto.prototype.is_first_time_get_previous_main_deck());;
                  if(!yestoslideAuto.prototype.is_first_time_get_previous_main_deck() && false)
                  {
                  
                    callback(false);
                    return;
                  }
                  
                  //yestoslideAuto.prototype.set_collecting_flag(false);
                  sunny_modal.show_spinner("이미지 데크");
                  yestoslideAuto.prototype.createNewPresentaion(function(rst){

                    if(rst)
                    {
                      if(!sunny.is_controller())
                      {
                        window.sunny_coordinator.set_collecting_for_controller(true);
                      }
                      //yestoslideAuto.prototype.set_collecting_flag(false);
                      callback(true);
                    }
                    else
                    {
                      console.log("deck not exist");
                      //window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/with_clients/').remove();
                      window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash()).remove();

                      restored_slides_id = "";
                      current_slides_id = "";
                      
                      callback(false);
                    }

                  });
                }
              })
              //console.log("set_stopped_collecting",false);
              
              
            }
            
        });
        
    };

    yestoslideAuto.prototype.includeHTML = function ()  {
        var z, i, elmnt, file, xhttp;
        /* Loop through a collection of all HTML elements: */
        z = window.document.getElementsByTagName("*");
        for (i = 0; i < z.length; i++) {
          elmnt = z[i];
          /*search for elements with a certain atrribute:*/
          file = elmnt.getAttribute("w3-include-html");
          if (file) {
            /* Make an HTTP request using the attribute value as the file name: */
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
              if (this.readyState == 4) {
                if (this.status == 200) {elmnt.innerHTML = this.responseText;}
                if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
                /* Remove the attribute, and call this function once more: */
                elmnt.removeAttribute("w3-include-html");
                yestoslideAuto.prototype.includeHTML();
              }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /* Exit the function: */
            return;
          }
        }
      }
    yestoslideAuto.prototype.load_js_file = function(jfile_to_be_loaded,callback)
    {
        
    
        var script = window.document.createElement('script');
        script.onload = function () {
            
            console.log("js loaded ");
            callback(true);
            
        };
        
        
        var date = new Date();
        var iso = new Date(date).toISOString();
        var milliseconds = Date.parse(date);
        
        try
        {
            script.src = jfile_to_be_loaded +"?sunny=00001&a="+milliseconds;
        }
        catch(err)
        {
            console.log(err.message);
            callback(false);
            
            return;
        }
        
        window.document.head.appendChild(script); //or something of the likes

    };


    yestoslideAuto.prototype.make_client_working_folder_sharable_with_coordinator = function()
    {
      return;
      yestoslideAuto.prototype.add_email_to_ReaderSharedLink(working_folder,coordinator_email,function(rst){
        console.log("working folder exposed to coordinator");
      })
    }

    yestoslideAuto.prototype.check_coordinator_email_exists = function(coordi_email,callback)
    {
      var email_hash = window.sha256(coordi_email);
      //console.log(email_hash);
      window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/with_clients/').once("value", function(snapshot){
        
       
        if(snapshot.val() != null)    
        {
          callback(true);
        }
        else
        {
          callback(false);
        }
            
      });
    }
    yestoslideAuto.prototype.get_previous_main_deck_for_client = function(callback)
    {
       

        if(!coordinator_email.includes("@gmail.com"))
        {
          alert("Coordinator email missing")
          location.href = "https://yestoslide.com";
        }
        //console.log("get_previous_main_deck_for_client  for add email to slides");
        console.log("coordinator_email",coordinator_email);
        var email_hash = window.sha256(coordinator_email);
        //console.log(email_hash);
        //console.log('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/with_clients/');
        window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/with_clients/').once("value", function(snapshot){
        
            //console.log(snapshot.val().explanations);
            
            if(snapshot.val() != null)    
            {
                restored_slides_id = snapshot.val().slideId;
                current_slides_id = snapshot.val().slideId;
                current_slides_name = snapshot.val().title;
                current_orignial_slides_id = snapshot.val().original_slideId;
                current_presentation_explanation = snapshot.val().explanations;
                //console.log("current_slides_id",current_slides_id);
                //console.log("current_presentation_explanation",current_presentation_explanation);

            
                var u = window.get_currentUser();
                //yestoslideAuto.prototype.add_email_to_sharedLink_XMLHttpRequest(u.email,yestoslideAuto.prototype.get_current_presentationID(),function(rst){
                //  console.log(rst);
                //});

                yestoslideAuto.prototype.add_email_to_sharedLink_XMLHttpRequest(u.email,yestoslideAuto.prototype.get_current_original_presentationID(),function(rst){
                  console.log(rst);
                });
                
                /*
                console.log("coordi needed", current_presentation_explanation.data.coordi_needed);
                if(current_presentation_explanation.data.coordi_needed ==)
                  coordinator_is_collecting = true;
                else
                  coordinator_is_collecting = false;
                  
               
                */
                  callback(true);

                //coordinator_is_collecting = true;
                //console.log("coorinator is colleting...");
            }
            else
            {
                console.log("no google slide info");
                //alert("coordinator is not collecting image");
                window.sunny_modal.show_alert_only("수합중이 아닙니다",false);
                coordinator_is_collecting = false;
                callback(false);
                console.log("coorinator is not colleting...");
            }
            
        });

        return;
        window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/with_clients_sheets/').once("value", function(snapshot){
            console.log(snapshot.val());
            //console.log(snapshot.val().slideId);
            if(snapshot.val() == null)    
            {
                console.log("no spreadsheet info");
                coordinator_is_collecting = false;
                callback(false);
            }
            else
            {

                current_spreadSheetId = snapshot.val().sheetsId;
                current_sheet_name = snapshot.val().tab_name;
                current_spreadsheet_name =snapshot.val().title;
                
                callback(true);
        
            }
        });
        
    };

    yestoslideAuto.prototype.getTimestamp_selfi_controller = function() {
        var dateNow = new Date();
        var dateMM = dateNow.getMonth() + 1; var dateDD = dateNow.getDate(); var  dateYY = dateNow.getFullYear(); var h = dateNow.getHours(); var m = dateNow.getMinutes();
        return dateNow.getFullYear() +''+ (dateMM<=9 ? '0' + dateMM : dateMM) +''+ (dateDD<=9 ? '0' + dateDD : dateDD) + (h<=9 ? '0' + h : h) + (m<=9 ? '0' + m : m);
    }
    
    yestoslideAuto.prototype.set_mp4blob = function(blob)
    {
        mp4blob = blob;
    }
    yestoslideAuto.prototype.upload_to_gd_video = function()
    {
        
    
        
        if(mp4blob == null)
        {
            alert("create video first.");
            return;
        }
    
        try
        {
          window.document.getElementById("sunny_spinner").classList.remove("d-none");
        }
        catch(err)
        {

        }
        
            current_selfi_shared_folderid_v2 =working_folder;
        
            var d = yestoslideAuto.prototype.getTimestamp_selfi_controller();
            var fname = "teacher"+"-"+d+".mp4";
            var f = mp4blob;
            f.lastModifiedDate = new Date();
            f.name = "sunny.mp4";
            yestoslideAuto.prototype.run_video(f)	;
             
    };

    yestoslideAuto.prototype.upload_to_gd_video_v2 = function(f,comment)
    {
        
    
      current_msg_to_add = comment;
    
        try
        {
          window.document.getElementById("sunny_spinner").classList.remove("d-none");
        }
        catch(err)
        {

        }
        
            current_selfi_shared_folderid_v2 =working_folder;
        
            var d = yestoslideAuto.prototype.getTimestamp_selfi_controller();
            var fname = "teacher"+"-"+d+".mp4";
           
           
            //f.name = "sunny.mp4";
            yestoslideAuto.prototype.run_video(f)	;
             
    };
    yestoslideAuto.prototype.getVideoBlob = function(iframeId)
    {
            window.document.getElementById(iframeId).contentWindow.get_video_blob();
    }
    yestoslideAuto.prototype.uploadVideoToGD = function (iframeId)
    {
      
        yestoslideAuto.prototype.getVideoBlob(iframeId);
        yestoslideAuto.prototype.upload_to_gd_video();
    };

    yestoslideAuto.prototype.send_orginal_image_v2 = function(iframId,original_image_file,Canvas1,Canvas2,msg,callback)
    {
      
      try{
        window.document.getElementById("sunny_spinner").classList.remove("d-none");
      }
      catch(err)
      {

      }
      var canvas ;
      var iframe;
      if(iframId =="main_iframe")
      {
        iframe = window.document.getElementById("main_iframe").contentWindow.document.getElementById("img_collection").contentWindow;
        canvas = iframe.window.document.getElementById(Canvas1);
      }
      else
      {
        iframe = window.document.getElementById(iframId).contentWindow;
        canvas = iframe.document.getElementById(Canvas1);
      }

    
      
      var ctx=canvas.getContext("2d");
      var cw=canvas.width;
      var ch=canvas.height;
      


      console.log(iframe);
      
      // get the dataURL of your div's background
      

      // build an image from the dataURL
      var img=new Image();
      //img.crossOrigin='anonymous';
      img.onload=function()
      {
        
        
          
          
        //fit size 사이즈 맞게
        var hRatio = canvas.width  / img.width    ;
        var vRatio =  canvas.height / img.height  ;
        var ratio  = Math.max ( hRatio, vRatio );
        var centerShift_x = ( canvas.width - img.width*ratio ) / 2;
        var centerShift_y = ( canvas.height - img.height*ratio ) / 2;  
        ctx.clearRect(0,0,canvas.width, canvas.height);
        ctx.filter = 'blur(80px)';
        ctx.drawImage(img, 0,0, img.width, img.height,
                          centerShift_x,centerShift_y,img.width*ratio, img.height*ratio);  

                          
        //var canvasBlur = new CanvasFastBlur({blur: 8 });  
        //canvasBlur.initCanvas(canvas);
        //canvasBlur.gBlur(8);
        
        var destinationCanvas;
        if(iframId =="main_iframe")
        {
          iframe = window.document.getElementById("main_iframe").contentWindow.document.getElementById("img_collection").contentWindow;
          destinationCanvas = iframe.window.document.getElementById(Canvas2);
        }
        else
        {
          iframe = window.document.getElementById(iframId).contentWindow;
          destinationCanvas = iframe.document.getElementById(Canvas2);
        }
        //var destinationCanvas = iframe.document.getElementById(Canvas2);
        var destCtx = destinationCanvas.getContext('2d');
        
        destCtx.clearRect(0, 0, destinationCanvas.width, destinationCanvas.height);
        //ctx.drawImage(destinationCanvas, 0, 0);

        if(iframId =="main_iframe")
        {
          iframe = window.document.getElementById("main_iframe").contentWindow.document.getElementById("img_collection").contentWindow;
          destCtx.drawImage(iframe.window.document.getElementById(Canvas1), 0, 0);  
        }
        else
        {

          console.log(iframe);
          iframe = window.document.getElementById(iframId).contentWindow;
          destCtx.drawImage(iframe.document.getElementById(Canvas1), 0, 0);
        }
        

          {
            var hRatio = destinationCanvas.width  / img.width    ;
            var vRatio =  destinationCanvas.height / img.height  ;
            var ratio  = Math.min ( hRatio, vRatio );
            var centerShift_x = ( destinationCanvas.width - img.width*ratio ) / 2;
            var centerShift_y = ( destinationCanvas.height - img.height*ratio ) / 2;  
            
          
            destCtx.drawImage(img, 0,0, img.width, img.height,
                              centerShift_x,centerShift_y,img.width*ratio, img.height*ratio);  


            callback(destinationCanvas);
            return;                  
                                  

          }
          
          
      
      
      };

      
      img.src=URL.createObjectURL(original_image_file);

    }
    yestoslideAuto.prototype.send_orginal_image = function(original_image_file,msg,callback)
    {
      sunny.create_and_upload_blur_image(original_image_file,function(blurredId){
        console.log("blurred uploaded");
        console.log(blurredId);
  
        
        sunny.uploadToGD_img(original_image_file,function(imageId){
          console.log("origintal uploaded");
          console.log(imageId);
         
          
          sunny.sendImageLink_with_background(imageId,blurredId,msg,function(rst){
            if(rst)
            {
              
              return;
            }
            else
            {
              console.log("error to insert image");
              //callback(false);
              //alert("error to insert image");
              return;
              
            }
          });
          callback(true);
          
        });
      })
    };

    
    yestoslideAuto.prototype.create_and_upload_blur_image = function(f,callback)
    {
      var canvas= document.createElement("canvas");
      canvas.setAttribute("id", 'canvas_for_blur');
      canvas.width = 960;
      canvas.height = 540;
      var ctx=canvas.getContext("2d");
      var cw=canvas.width;
      var ch=canvas.height;

      
      // get the dataURL of your div's background
      

      // build an image from the dataURL
      var img=new Image();
      //img.crossOrigin='anonymous';
      img.onload=function(){
      
        
        
        //fit size 사이즈 맞게
        var hRatio = canvas.width  / img.width    ;
        var vRatio =  canvas.height / img.height  ;
        var ratio  = Math.max ( hRatio, vRatio );
        var centerShift_x = ( canvas.width - img.width*ratio ) / 2;
        var centerShift_y = ( canvas.height - img.height*ratio ) / 2;  
        ctx.clearRect(0,0,canvas.width, canvas.height);
        ctx.filter = 'blur(4px)';
        ctx.drawImage(img, 0,0, img.width, img.height,
                          centerShift_x,centerShift_y,img.width*ratio, img.height*ratio);  

                          
        var canvasBlur = new CanvasFastBlur({blur: 6 });  
        canvasBlur.initCanvas(canvas);
        canvasBlur.gBlur(6);
                          
        //StackBlur.image(img, canvas, 5,false);
        
        var dataURI = canvas.toDataURL("image/JPEG",0.5);
        //console.log(dataURI);
        sunny.uploadToGD_base64_only(dataURI,function(blurFileId){
          console.log(blurFileId);
          yestoslideAuto.prototype.add_email_to_sharedLink(blurFileId,"yestoslide@gmail.com",function(rst){
            console.log("add yestoslide@gmail.com to blured file");
            callback(blurFileId);
          });
          
        })
      }

      img.src=URL.createObjectURL(f);
    }
 
    yestoslideAuto.prototype.uploadToGD_base64_only = function(base64,callback)
    {
      if(base64.length <100)
      {
          console.log("no image data to upload");
          callback("");
          return;
      }
      data_picture = base64;
      current_selfi_shared_folderid_v2 =working_folder;
      console.log("current_selfi_shared_folderid_v2",current_selfi_shared_folderid_v2);
  
      var d = yestoslideAuto.prototype.getTimestamp_selfi_controller();
      var fname = "yestoslide"+"-"+d+".png";
      var file = yestoslideAuto.prototype.dataURLtoFile_(data_picture,fname);

      is_image = true;
      perentage_upload =0;
      
      if(current_selfi_shared_folderid_v2 =="")
      {
          console.log("current_selfi_shared_folderid_v2",current_selfi_shared_folderid_v2);
          
          callback("");
          return;
      }
      
  
      
      var contentType = 'image/PNG';
      if (file.name != "") {
        let fr = new FileReader();
        fr.fileName = file.name;
        fr.fileSize = file.size;
        fr.fileType = contentType;
        fr.readAsArrayBuffer(file);
        fr.onload = function(e){
          const f = e.target;
          //console.log(e);
      
          //alert(f.fileType);
          
          var accessToken =window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;
          const resource = {
          fileName: f.fileName,
          fileSize: f.fileSize,
          fileType: f.fileType,
          fileBuffer: f.result,
          //folderId: current_selfi_shared_folderid_v2,
          folderId:current_selfi_shared_folderid_v2,
          accessToken: accessToken
          
          };
          
          console.log(resource);
          const ru = new window.ResumableUploadToGoogleDrive();
          ru.Do(resource, function(res, err) {
              if (err) {
      
                
                  
                  console.log(err);
                  newly_uploaded_fileId = "";
                  console.log("faile to upload");
                  callback("");
                  return;
              
              }
              
              
              
              
              console.log(res.status);
              let msg = "";
              if (res.status == "Uploading") {
                  msg =
                  Math.round(
                      (res.progressNumber.current / res.progressNumber.end) * 100
                  ) + "%";
                  
                  console.log("percentage",(res.progressNumber.current / res.progressNumber.end) * 100);
                  
              } else {
                  msg = res.status;
              }
              //document.getElementById("progress").innerText = msg;
              
              if(res.status =="Done")
              {
                
                  
                  console.log(res.result.id);
                  console.log(res.result);
                  
                  newly_uploaded_fileId = res.result.id;


                  callback(newly_uploaded_fileId);
                
              }
          });
        }
      
      }
    }
    yestoslideAuto.prototype.uploadToGD_img = function(imageFile,callback)
    {
        
                    
        current_selfi_shared_folderid_v2 =working_folder;
        //console.log(f);
        
        
        is_image = true;
        perentage_upload =0;
        //var d = getTimestamp_selfi();
        //console.log(obj);
         const file = imageFile;
        //console.log("ddd");
        if(current_selfi_shared_folderid_v2 =="")
        {
            console.log("current_selfi_shared_folderid_v2",current_selfi_shared_folderid_v2);
            
            callback("");
            return;
        }
        

      var fr = new FileReader();
      fr.onload = function () {
      var img = new Image();
      
      //console.log(fr.result);

      var canvas = document.createElement("canvas");
      //var canvas = document.getElementById("canvas_for_blur");

      var ctx = canvas.getContext("2d");
      img.onload = function() {


        console.log(img.width ,img.height ,img.width * img.height); //25,000,000 
        var desired_width =img.width;
        var desired_height =img.height;
        var pixcels_limit = 25000000;
        
        while((desired_width * desired_height) >pixcels_limit)
        {
          desired_width  = desired_width* 0.9;
          desired_height  = desired_height* 0.9;

        }

        console.log(desired_width,desired_height,desired_width * desired_height); //25,000,000  42050240
        
        
        canvas.width =desired_width;
        canvas.height = desired_height;
        //ctx.drawImage(canvas, 0, 0 200, 100);
        ctx.drawImage(img, 0, 0, img.width,    img.height,     0, 0, canvas.width, canvas.height); 
        //ctx.drawImage(img, 0, 0);
        var encoderOptions =1.0;

        
        var data = canvas.toDataURL('image/jpeg', encoderOptions);
        

        while(data.length  > 3 *1048576 )
        {
          encoderOptions= encoderOptions -1;
          data = canvas.toDataURL('image/jpeg', encoderOptions);
          //console.log(data.length);
          
          if(data.length  < 3 *1048576)
          {
            //console.log(data);
            break;
          }
        }
          
          
        yestoslideAuto.prototype.uploadToGD_base64_only(data,function(fleID){
          console.log(fleID);
          yestoslideAuto.prototype.add_email_to_sharedLink(newly_uploaded_fileId,"yestoslide@gmail.com",function(rst){
            callback(fleID);
          });
          

        });

      };
      img.src = fr.result;
    }
    fr.readAsDataURL(imageFile);

    return;

        
       
    };
    yestoslideAuto.prototype.upload_data_only = function(base64,filename,callback)
    {
      if(base64.length <100)
      {
          alert("no image data to upload");
          callback("");
          return;
      }

                  
      
      
      //current_selfi_shared_folderid_v2 ="1q2t2LBhE6hYKeTS02-wLw3L2nwPQRqZZ";
      console.log("working_folder",working_folder);
      current_selfi_shared_folderid_v2 =working_folder;
      console.log("current_selfi_shared_folderid_v2",current_selfi_shared_folderid_v2);
  
      var d = yestoslideAuto.prototype.getTimestamp_selfi_controller();
      //var fname = "yestoslide"+"-"+d+".png";
      var fname =filename;
      var f = yestoslideAuto.prototype.dataURLtoFile_(base64,fname);

      perentage_upload =0;
      const file = f;
      
      if(current_selfi_shared_folderid_v2 =="")
      {
          console.log("current_selfi_shared_folderid_v2",current_selfi_shared_folderid_v2);
          callback("");
          return;
      }
      
    
      
      var contentType = 'image/JPEG';
      if (file.name != "") {
        let fr = new FileReader();
        fr.fileName = file.name;
        fr.fileSize = file.size;
        fr.fileType = contentType;
        fr.readAsArrayBuffer(file);
        fr.onload = function(e){

            
          const f = e.target;
                    
          var accessToken =window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;
          const resource = {
          fileName: f.fileName,
          fileSize: f.fileSize,
          fileType: f.fileType,
          fileBuffer: f.result,
          //folderId: current_selfi_shared_folderid_v2,
          folderId:current_selfi_shared_folderid_v2,
          accessToken: accessToken
          
          };
          
          
          const ru = new window.ResumableUploadToGoogleDrive();
          ru.Do(resource, function(res, err) {
              if (err) {
        
                console.log(err);
                
                
                callback("");
                return;
              
              }
              
              
              
              
              console.log(res.status);
              let msg = "";
              if (res.status == "Uploading") {
                  msg =
                  Math.round(
                      (res.progressNumber.current / res.progressNumber.end) * 100
                  ) + "%";
                  
                  console.log("percentage",(res.progressNumber.current / res.progressNumber.end) * 100);
                  
              } else {
                  msg = res.status;
              }
              //document.getElementById("progress").innerText = msg;
              
              if(res.status =="Done")
              {
                
                  
                console.log(res.result.id);
                console.log(res.result);

                callback(res.result.id);
                  
              }
          });
        };
      }
      
    };


    
    yestoslideAuto.prototype.upload_with_email = function (base64,fname,callback)
    {

      
      console.log("upload_data_only");
      yestoslideAuto.prototype.upload_data_only(base64,fname,function(rst){
        
        console.log(rst);
        if(rst == "")
        {
          callback(false);
          return;
          
        }
        else
        {
          newly_uploaded_fileId = rst;
         
          yestoslideAuto.prototype.make_anyone_reader(newly_uploaded_fileId,function(rst){
          //yestoslideAuto.prototype.add_email_to_sharedLink(newly_uploaded_fileId,"yestoslide@gmail.com",function(rst){
           
            //yestoslideAuto.prototype.add_email_to_sharedLink(newly_uploaded_fileId,coordinator_email,function(rst){
              if(rst)
              {
                 
                callback(newly_uploaded_fileId);
                 
              }
              else
                callback("");
            //});
               
                
                
          })
        }
      });
    }

    var uploaded_image_cnt = 0;
    yestoslideAuto.prototype.uploadToGD_base64 = function(base64,msg,orgData="",mimetype,callback)
    {
      

      if(base64.length <100)
      {
          alert("no image data to upload");
          callback(true);
          
          return;
      }



      base64 = base64.replace("data:image/jpeg;base64,","");
      //console.log(base64);

      orgData= orgData.replace("data:image/png;base64,","");
      //console.log(orgData);

      var d = new Date();
      var ctime = d.YYYYMMDDHHMMSS();
      uploaded_image_cnt++;
      var fname = "yestoslide"+"-"+d.YYYYMMDDHHMMSS()+"-"+uploaded_image_cnt.toString()+".jpg";
      var org_fname = fname.replace(".jpg","_original.jpg");

      var imageId_for_thumb= "";
      var imageId_for_origin = "";
      var slideId_for_thumb = "";
      var slideId_for_origin = "";

      window.sunny_modal.show_spinner("사진 올리기");

      if(window.sunny.is_image_and_insert_to_deck_at_once())
      {
        if(window.sunny.is_original_slide_only())
        {
          window.sunny.copy_one_blob_to_sharing_folder_and_add_to_deck(orgData,fname,true,current_orignial_slides_id,function(rst){

            console.log(rst);
            if(rst.imgId =="" || rst.slideId=="")
            {
              window.sunny_modal.hide_spinner();
              console.log("uploading fail");
              callback(false);
                
              return;
            }
            imageId_for_origin = rst.imgId;
            imageId_for_thumb = rst.imgId;
            slideId_for_origin = rst.slideId;
            slideId_for_thumb = rst.slideId;
  
            if(imageId_for_origin == null || typeof imageId_for_origin ==="undefined" || imageId_for_thumb == null || typeof imageId_for_thumb ==="undefined")
            {
              window.sunny_modal.hide_spinner();
              console.log("uploading fail");
              callback(false);
                
              return;
            }
            window.sunny_modal.show_spinner("마무리");
            var imagesInSharing ={
              orgimg_in_sharing: imageId_for_origin,
              thumbimg_in_sharing:imageId_for_thumb
            }
            
            console.log(imagesInSharing);
            window.sunny.update_sharing_images_info(imagesInSharing,fname,msg);
  
  
            
            var user = window.gapi.auth2.getAuthInstance().currentUser.get();
            var profile = user.getBasicProfile();
            var incarved_data = {
              ctime:ctime,
              msg:msg,
              imageId_for_origin:imageId_for_origin,
              imageId_for_thumb:imageId_for_thumb,
              Email:profile.getEmail(),
              Name:profile.getName(),
              ProfileImage:profile.getImageUrl(),
              orginPresent:current_orignial_slides_id,
              thumbPresent:current_slides_id,
              kind:"Image"
            }
  
            incarved_data.OriginID = slideId_for_origin;
            incarved_data.ID = slideId_for_thumb;
            console.log(incarved_data);
            window.sunny.insert_incarved_data(current_slides_id,slideId_for_thumb,current_orignial_slides_id,slideId_for_origin,incarved_data,function(rst){
  
              
              console.log(rst);
              window.sunny_modal.hide_spinner();
              if(rst.rst != "success")
              {
                
                window.sunny_modal.hide_spinner();
                console.log("uploading fail");
                callback(false);
                return;
              }
              else
              {
  
                sunny_slides_sheets.add_commment_to_personal_database_using_slides(msg,slideId_for_thumb,slideId_for_origin,function(rst){
  
              
                  console.log("add_commment_to_personal_database_using_slides");
                  console.log(rst);
                  callback(true);
                });
              }
  
            });
            
          });
  
        }
        else
        {

          window.sunny.copy_blobs_to_sharing_folder_and_add_to_deck(orgData,base64,fname,current_orignial_slides_id,current_slides_id,function(rst){

            if(rst.imgId =="" || rst.slideId=="")
            {
              window.sunny_modal.hide_spinner();
              console.log("uploading fail");
              callback(false);
                
              return;
            }
            imageId_for_origin = rst.imgId;
            imageId_for_thumb = rst.imgId_thumb;
            slideId_for_origin = rst.slideId;
            slideId_for_thumb = rst.slideId_thumb;
  
            var imagesInSharing ={
              orgimg_in_sharing: imageId_for_origin,
              thumbimg_in_sharing:imageId_for_thumb
            }
            
            console.log(imagesInSharing);
            window.sunny.update_sharing_images_info(imagesInSharing,fname,msg);
  
  
            
            var user = window.gapi.auth2.getAuthInstance().currentUser.get();
            var profile = user.getBasicProfile();
            var incarved_data = {
              ctime:ctime,
              msg:msg,
              imageId_for_origin:imageId_for_origin,
              imageId_for_thumb:imageId_for_thumb,
              Email:profile.getEmail(),
              Name:profile.getName(),
              ProfileImage:profile.getImageUrl(),
              orginPresent:current_orignial_slides_id,
              thumbPresent:current_slides_id,
              kind:"Image"
            }
  
            incarved_data.OriginID = slideId_for_origin;
            incarved_data.ID = slideId_for_thumb;
            console.log(incarved_data);
            window.sunny.insert_incarved_data(current_slides_id,slideId_for_thumb,current_orignial_slides_id,slideId_for_origin,incarved_data,function(rst){
  
              
              console.log(rst);
              window.sunny_modal.hide_spinner();
              if(rst.rst != "success")
              {
                
                window.sunny_modal.hide_spinner();
                console.log("uploading fail");
                callback(false);
                return;
              }
              else
              {
  
                sunny_slides_sheets.add_commment_to_personal_database_using_slides(msg,slideId_for_thumb,slideId_for_origin,function(rst){
  
              
                  console.log("add_commment_to_personal_database_using_slides");
                  console.log(rst);
                  callback(true);
                });
              }
  
            });
            
          });  
        }
      }
      else
      {
        var error_in_copy_one_blob_to_sharing_folder = false;
        var get_thumb_answer_from_copy_one_blob_to_sharing_folder = false;
        var get_org_answer_from_copy_one_blob_to_sharing_folder = false;
  
        window.sunny.copy_one_blob_to_sharing_folder(orgData,fname,true,function(imginfo){
          console.log(imginfo);
          if(imginfo.imgId =="")
          {
            error_in_copy_one_blob_to_sharing_folder = true;
          }
          else
            imageId_for_origin = imginfo.imgId;
  
          get_org_answer_from_copy_one_blob_to_sharing_folder =true;
          
          
        });
  
        window.sunny.copy_one_blob_to_sharing_folder(base64,fname,false,function(imginfo){
  
          console.log(imginfo);
          if(imginfo.imgId =="")
          {
            error_in_copy_one_blob_to_sharing_folder = true;
          }
          else
          {
            imageId_for_thumb=  imginfo.imgId;
            console.log(imageId_for_thumb);
          }
            
          
          get_thumb_answer_from_copy_one_blob_to_sharing_folder =true;
  
          var check_error = setInterval(() => {
            
            if(error_in_copy_one_blob_to_sharing_folder)
            {
  
              clearInterval(check_error);
              window.sunny_modal.hide_spinner();
              console.log("uploading fail");
              callback(false);
              return;
  
            }
            if(get_org_answer_from_copy_one_blob_to_sharing_folder && get_thumb_answer_from_copy_one_blob_to_sharing_folder)
            {
  
              clearInterval(check_error);
              window.sunny_modal.hide_spinner();
              if(window.sunny.is_original_slide_only())
              {
                imageId_for_thumb = imageId_for_origin;
              }
              var imagesInSharing ={
                orgimg_in_sharing: imageId_for_origin,
                thumbimg_in_sharing:imageId_for_thumb
              }
              
              console.log(imagesInSharing);
              window.sunny.update_sharing_images_info(imagesInSharing,fname,msg);
  
              console.log("Do not leave..");
              window.sunny_modal.show_spinner("마무리");
              
  
              console.log(current_orignial_slides_id,current_slides_id);
              var error_in_insertImageToNewSlides_without_incarved_data = false;
              
              
              yestoslideAuto.prototype.insertImageToNewSlides_without_incarved_data(false,imageId_for_thumb,current_slides_id,function(slideId_thumb_info){
  
                console.log(slideId_thumb_info);
                if(slideId_thumb_info.slideId =="")
                {
                  error_in_insertImageToNewSlides_without_incarved_data = true;
                }
                else
                {
                  if(!window.sunny.is_original_slide_only())
                    slideId_for_thumb = slideId_thumb_info.slideId;
                }
                var check_error = setInterval(() => {
  
                  //console.log(slideId_for_thumb,slideId_for_origin);
                  if(error_in_insertImageToNewSlides_without_incarved_data)
                  {
                    clearInterval(check_error);
                    window.sunny_modal.hide_spinner();
                    console.log("uploading fail");
                    callback(false);
                    return;
                  }
                  console.log("thumb ",slideId_for_thumb,"org ",slideId_for_origin);
                  if(slideId_for_thumb != "" &&  slideId_for_origin != "")
                  {
                    if(window.sunny.is_original_slide_only())
                      slideId_for_thumb = slideId_for_origin;

                    clearInterval(check_error);
                    
  
                    var user = window.gapi.auth2.getAuthInstance().currentUser.get();
                    var profile = user.getBasicProfile();
                    var incarved_data = {
                      ctime:ctime,
                      msg:msg,
                      imageId_for_origin:imageId_for_origin,
                      imageId_for_thumb:imageId_for_thumb,
                      Email:profile.getEmail(),
                      Name:profile.getName(),
                      ProfileImage:profile.getImageUrl(),
                      orginPresent:current_orignial_slides_id,
                      thumbPresent:current_slides_id,
                      kind:"Image"
                    }
  
                    incarved_data.OriginID = slideId_for_origin;
                    incarved_data.ID = slideId_for_thumb;
                    console.log(incarved_data);
                    window.sunny.insert_incarved_data(current_slides_id,slideId_for_thumb,current_orignial_slides_id,slideId_for_origin,incarved_data,function(rst){
  
                      
                      console.log(rst);
                      window.sunny_modal.hide_spinner();
                      if(rst.rst != "success")
                      {
                       
                        window.sunny_modal.hide_spinner();
                        console.log("uploading fail");
                        callback(false);
                        return;
                      }
                      else
                      {
  
                        sunny_slides_sheets.add_commment_to_personal_database_using_slides(msg,slideId_for_thumb,slideId_for_origin,function(rst){
  
                      
                          console.log("add_commment_to_personal_database_using_slides");
                          console.log(rst);
                          callback(true);
                        });
                      }
  
                    });
                  }
                }, 100);
                
              });
  
              yestoslideAuto.prototype.insertImageToNewSlides_without_incarved_data(true,imageId_for_origin,current_orignial_slides_id,function(slideId_origin_info){
  
                console.log(slideId_origin_info);
                if(slideId_origin_info.slideId =="")
                {
                  error_in_insertImageToNewSlides_without_incarved_data = true;
                }
                else
                {
                  
                  console.log("insertImageToNewSlides_without_incarved_data imgorg 성공");
                  slideId_for_origin = slideId_origin_info.slideId;
                  if(window.sunny.is_original_slide_only())
                  {
                    slideId_for_thumb = slideId_origin_info.slideId;
                  }
                  
                    
                }
              });
  
  
  
  
  
              
            }
          }, 500);
  
        });
      }





      return;
      window.sunny.copy_blobs_to_sharing_folder(base64,orgData,fname,org_fname,function(imagesInSharing){
        console.log(imagesInSharing);

        console.log("Do not leave..");
        window.sunny_modal.show_spinner("마무리");
        var user = window.gapi.auth2.getAuthInstance().currentUser.get();
        var profile = user.getBasicProfile();
        var incarved_data = {
          ctime:ctime,
          msg:msg,
          imageId_for_origin:imageId_for_origin,
          imageId_for_thumb:imageId_for_thumb,
          Email:profile.getEmail(),
          Name:profile.getName(),
          ProfileImage:profile.getImageUrl(),
          orginPresent:current_orignial_slides_id,
          thumbPresent:current_slides_id,
          kind:"Image"
        }

        if(imagesInSharing.orgimg_in_sharing =="" || imagesInSharing.thumbimg_in_sharing =="")
        {
          window.sunny_modal.hide_spinner();
          alert("uploading fail");
          callback(false);
          return;
        }
        else
        {
          imageId_for_thumb= imagesInSharing.thumbimg_in_sharing;
          imageId_for_origin = imagesInSharing.orgimg_in_sharing;
          window.sunny.update_sharing_images_info(imagesInSharing,fname,msg);
                            
        }

        
        yestoslideAuto.prototype.insertImageToNewSlides(imageId_for_origin,current_orignial_slides_id,incarved_data,function(slideId_origin_info){
        
          try{
            if(slideId_origin_info.slideId =="error")
            {
              window.sunny_modal.hide_spinner();
              alert("uploading fail");
              callback(false);

              return;
            }
          }
          catch(err)
          {
            window.sunny_modal.hide_spinner();
            alert("uploading fail");
            callback(false);

            return;
          }
          
          window.sunny_modal.show_spinner("마무리 중..");
          
          
          console.log("original",slideId_origin_info.slideId);
          if(slideId_origin_info.slideId != "" || true)
          {
            var slideId_for_origin = slideId_origin_info.slideId;
            var origin_contentUrl = slideId_origin_info.contentUrl;
            incarved_data.OriginID = slideId_for_origin;
            yestoslideAuto.prototype.insertImageToNewSlides(imageId_for_thumb,current_slides_id,incarved_data,function(slideId_thumb_info){
          
              try{
                if(slideId_thumb_info.slideId =="error")
                {
                  window.sunny_modal.hide_spinner();
                  alert("uploading fail");
                  callback(false);

                  return;
                }
              }
              catch(err)
              {
                window.sunny_modal.hide_spinner();
                alert("uploading fail");
                callback(false);

                return;
              }
              
              console.log("thumb_slide_id",slideId_thumb_info.slideId);
              if(slideId_thumb_info.slideId != "" || true)
              {


                var slideId_for_thumb = slideId_thumb_info.slideId;
                var thumb_contentUrl = slideId_thumb_info.contentUrl;

                if(slideId_for_thumb != "" && slideId_for_origin != "")
                {
                  console.log("slideId_for_thumb:",slideId_for_thumb);
                  console.log("slideId_for_origin:",slideId_for_origin);
                  console.log("thumb_contentUrl:",thumb_contentUrl);
                  console.log("origin_contentUrl:",origin_contentUrl);
                  var email_hash = window.sha256(coordinator_email);
                  window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/newly_added_slide/'+ window.sha256(fname)).update({
                    slideId_for_thumb:slideId_for_thumb,
                    //slideId_for_thumb:"",
                    thumb_contentUrl: thumb_contentUrl,
                    slideId_for_origin:slideId_for_origin,
                    origin_contentUrl: origin_contentUrl,
                    msg_present: sunny_slides_sheets.get_message_slide_for_history()
                  });

                  //yestoslideAuto.prototype.add_record_v2(ctime,slideId_for_thumb, current_slides_id, slideId_for_origin,current_orignial_slides_id,msg,imageId_for_origin,imageId_for_thumb,"Image");

                  sunny_slides_sheets.add_commment_to_personal_database_using_slides(msg,slideId_for_thumb,slideId_for_origin,function(rst){

                    
                    console.log("add_commment_to_personal_database_using_slides");
                    console.log(rst);
                    callback(true);
                  });

                }
                else
                {
                  console.log("could not get slideId");
                  console.log("slideId_for_thumb",slideId_for_thumb);
                  console.log("slideId_for_origin",slideId_for_origin);
                  window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/newly_added_slide/'+ window.sha256(fname)).update({
                    slideId_for_thumb:slideId_for_thumb,
                    slideId_for_origin:slideId_for_origin,
                    msg_present: sunny_slides_sheets.get_message_slide_for_history()
                    
                  });
                  callback(true);
                  
                }
              }
              else
              {
                window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/newly_added_slide/'+ window.sha256(fname)).update({
                  slideId_for_thumb:"fail",
                  slideId_for_origin:"fail"
                  
                });
                alert("fail to create slide1");
              }
              try{
                window.document.getElementById("sunny_spinner").classList.add("d-none");
                window.document.getElementById("spinner_label").classList.add("d-none");
                window.document.getElementById("spinner_label").innerHTML ="";
              }
              catch(err)
              {

              }
              
            })
          }
          
        })



      });
     
     
      return;
      
      //data_picture = base64;
      window.sunny_modal.show_spinner("사진 올리기");
      
      //var d = yestoslideAuto.prototype.getTimestamp_selfi_controller();
      var d = new Date();
      uploaded_image_cnt++;
      var fname = "yestoslide"+"-"+d.YYYYMMDDHHMMSS()+"-"+uploaded_image_cnt.toString()+".jpg";

      var imageId_for_thumb= "";
      var imageId_for_origin = "";
      var slideId_for_thumb = "";
      var slideId_for_origin = "";
      
      //for thumb image
      yestoslideAuto.prototype.upload_with_email(base64,fname,function(fid){
        if(fid !="")
        {
          imageId_for_thumb =fid;
          //fname = "yestoslide"+"-"+d.YYYYMMDDHHMMSS()+"-"+uploaded_image_cnt.toString()+"_orginal.jpg";
          fname = fname.replace(".jpg","_original.jpg");
          console.log(fname);

          yestoslideAuto.prototype.upload_with_email(orgData,fname,function(fid){
            if(fid !="")
            {
              imageId_for_origin = fid;

              try
              {
                window.document.getElementById("sunny_spinner").classList.add("d-none");
              }
              catch(err)
              {

              }

                
             
              console.log("Do not leave..");
              window.sunny_modal.show_spinner("마무리");


              var user = window.gapi.auth2.getAuthInstance().currentUser.get();
              var profile = user.getBasicProfile();
              var incarved_data = {
                ctime:ctime,
                msg:msg,
                imageId_for_origin:imageId_for_origin,
                imageId_for_thumb:imageId_for_thumb,
                Email:profile.getEmail(),
                Name:profile.getName(),
                ProfileImage:profile.getImageUrl(),
                orginPresent:current_orignial_slides_id,
                thumbPresent:current_slides_id,
                kind:"Image"
              }

              window.sunny.copy_imgages_to_sharing_folder(imageId_for_origin,imageId_for_thumb,function(imagesInSharing){
                console.log(imagesInSharing);
                if(imagesInSharing.orgimg_in_sharing =="" || imagesInSharing.thumbimg_in_sharing =="")
                {
                  window.sunny_modal.hide_spinner();
                  alert("uploading fail");
                  callback(false);
                  return;
                }
                else
                {
                  window.sunny.update_sharing_images_info(imagesInSharing,fname,msg);
                                    
                }
                yestoslideAuto.prototype.insertImageToNewSlides(imageId_for_origin,current_orignial_slides_id,incarved_data,function(slideId_origin_info){
                
                  try{
                    if(slideId_origin_info.slideId =="error")
                    {
                      window.sunny_modal.hide_spinner();
                      alert("uploading fail");
                      callback(false);
  
                      return;
                    }
                  }
                  catch(err)
                  {
                    window.sunny_modal.hide_spinner();
                    alert("uploading fail");
                    callback(false);
  
                    return;
                  }
                  
                  window.sunny_modal.show_spinner("마무리 중..");
                  
                  
                  console.log("original",slideId_origin_info.slideId);
                  if(slideId_origin_info.slideId != "" || true)
                  {
                    var slideId_for_origin = slideId_origin_info.slideId;
                    var origin_contentUrl = slideId_origin_info.contentUrl;
                    incarved_data.OriginID = slideId_for_origin;
                    yestoslideAuto.prototype.insertImageToNewSlides(imageId_for_thumb,current_slides_id,incarved_data,function(slideId_thumb_info){
                  
                      try{
                        if(slideId_thumb_info.slideId =="error")
                        {
                          window.sunny_modal.hide_spinner();
                          alert("uploading fail");
                          callback(false);
      
                          return;
                        }
                      }
                      catch(err)
                      {
                        window.sunny_modal.hide_spinner();
                        alert("uploading fail");
                        callback(false);
      
                        return;
                      }
                     
                      console.log("thumb_slide_id",slideId_thumb_info.slideId);
                      if(slideId_thumb_info.slideId != "" || true)
                      {
  
  
                        var slideId_for_thumb = slideId_thumb_info.slideId;
                        var thumb_contentUrl = slideId_thumb_info.contentUrl;
  
                        if(slideId_for_thumb != "" && slideId_for_origin != "")
                        {
                          console.log("slideId_for_thumb:",slideId_for_thumb);
                          console.log("slideId_for_origin:",slideId_for_origin);
                          console.log("thumb_contentUrl:",thumb_contentUrl);
                          console.log("origin_contentUrl:",origin_contentUrl);
                          window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/newly_added_slide/'+ window.sha256(fname)).update({
                            slideId_for_thumb:slideId_for_thumb,
                            //slideId_for_thumb:"",
                            thumb_contentUrl: thumb_contentUrl,
                            slideId_for_origin:slideId_for_origin,
                            origin_contentUrl: origin_contentUrl,
                            msg_present: sunny_slides_sheets.get_message_slide_for_history()
                          });
  
                          //yestoslideAuto.prototype.add_record_v2(ctime,slideId_for_thumb, current_slides_id, slideId_for_origin,current_orignial_slides_id,msg,imageId_for_origin,imageId_for_thumb,"Image");
  
                          sunny_slides_sheets.add_commment_to_personal_database_using_slides(msg,slideId_for_thumb,slideId_for_origin,function(rst){
  
                            
                            console.log("add_commment_to_personal_database_using_slides");
                            console.log(rst);
                            callback(true);
                          });
    
                        }
                        else
                        {
                          console.log("could not get slideId");
                          console.log("slideId_for_thumb",slideId_for_thumb);
                          console.log("slideId_for_origin",slideId_for_origin);
                          window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/newly_added_slide/'+ window.sha256(fname)).update({
                            slideId_for_thumb:slideId_for_thumb,
                            slideId_for_origin:slideId_for_origin,
                            msg_present: sunny_slides_sheets.get_message_slide_for_history()
                            
                          });
                          callback(true);
                          
                        }
                      }
                      else
                      {
                        window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/newly_added_slide/'+ window.sha256(fname)).update({
                          slideId_for_thumb:"fail",
                          slideId_for_origin:"fail"
                          
                        });
                        alert("fail to create slide1");
                      }
                      try{
                        window.document.getElementById("sunny_spinner").classList.add("d-none");
                        window.document.getElementById("spinner_label").classList.add("d-none");
                        window.document.getElementById("spinner_label").innerHTML ="";
                      }
                      catch(err)
                      {
  
                      }
                      
                    })
                  }
                  
                })
              })
              



              return;


              /*
              setTimeout(() => {
                //window.sunny_modal.show_alert_only("will make slide- 1",false);
                
              }, 3000);
              setTimeout(() => {
                
                return;
                window.document.getElementById("sunny_spinner").classList.remove("d-none");
                window.document.getElementById("spinner_label").classList.remove("d-none");
                
                var current_web_region = navigator.language;
                if(current_web_region.indexOf("ko") != -1)
                  window.document.getElementById("spinner_label").innerHTML ="<p>슬라이드 만드는 중..</p>";
                else              
                  window.document.getElementById("spinner_label").innerHTML ="<p>Creating Slide</p>";
                
               
              }, 200);
              */
              //alert("upload both success");
              var email_hash = window.sha256(coordinator_email);
              console.log("coordinator_email",coordinator_email);

              var user = window.gapi.auth2.getAuthInstance().currentUser.get();
              var profile = user.getBasicProfile();
              console.log('Full Name: ' + profile.getName());
              console.log('Given Name: ' + profile.getGivenName());
              console.log('Family Name: ' + profile.getFamilyName());
              console.log('Image URL: ' + profile.getImageUrl());
              console.log('Email: ' + profile.getEmail());

              var d = new Date();
              var ctime = d.YYYYMMDDHHMMSS();
              var u = window.get_currentUser();
              var email_hash_me = window.sha256(u.email);
              
              var tmp_key = window.sha256(fname +u.email);
              
              console.log("tmp_key",tmp_key);
              window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/newly_added_slide/'+ window.sha256(tmp_key)).set({
                
                imageId_for_thumb:imageId_for_thumb,
                imageId_for_origin:imageId_for_origin,
                audience_name: profile.getName(),
                audience_email: profile.getEmail(),
                profileUrl: profile.getImageUrl(),
                comment:msg,
                createdTime:ctime,
                fname:fname,
                kind:"Image",
                msg_present: window.sunny_slides_sheets.get_message_slide_for_history(),

               
              });

              //Email="+profile.getEmail()+"&Name="+profile.getName() +"&ProfileImage="+profile.getImageUrl()
              var incarved_data = {
                ctime:ctime,
                msg:msg,
                imageId_for_origin:imageId_for_origin,
                imageId_for_thumb:imageId_for_thumb,
                Email:profile.getEmail(),
                Name:profile.getName(),
                ProfileImage:profile.getImageUrl(),
                orginPresent:current_orignial_slides_id,
                thumbPresent:current_slides_id,
                kind:"Image"
              }

              callback(true);
              return;
              yestoslideAuto.prototype.add_email_to_sharedLink(imageId_for_origin,window.sunny.getCoordinatorEmail(),function(rst){
                console.log(rst);

                yestoslideAuto.prototype.add_email_to_sharedLink(imageId_for_thumb,window.sunny.getCoordinatorEmail(),function(rst){
                  console.log(rst);
                });
              });
              console.log("finished uploading image");
              window.sunny_modal.hide_spinner();
              return;
              yestoslideAuto.prototype.insertImageToNewSlides(imageId_for_origin,current_orignial_slides_id,incarved_data,function(slideId_origin_info){
                
                try{
                  if(slideId_origin_info.slideId =="error")
                  {
                    window.document.getElementById("sunny_spinner").classList.add("d-none");
                    window.document.getElementById("spinner_label").classList.add("d-none");
                    window.document.getElementById("spinner_label").innerHTML ="";
                    alert("uploading fail");
                    callback(false);

                    return;
                  }
                }
                catch(err)
                {
                  window.document.getElementById("sunny_spinner").classList.add("d-none");
                  window.document.getElementById("spinner_label").classList.add("d-none");
                  window.document.getElementById("spinner_label").innerHTML ="";
                  alert("uploading fail");
                  callback(false);

                  return;
                }
                
                window.document.getElementById("sunny_spinner").classList.remove("d-none");
                window.document.getElementById("spinner_label").classList.remove("d-none");

                var current_web_region = navigator.language;
                if(current_web_region.indexOf("ko") != -1)
                  window.document.getElementById("spinner_label").innerHTML ="<p>슬라이드 마무리 중..</p>";
                else              
                  window.document.getElementById("spinner_label").innerHTML ="<p>Uploading Slide</p>";
                
                console.log("original",slideId_origin_info.slideId);
                if(slideId_origin_info.slideId != "" || true)
                {
                  var slideId_for_origin = slideId_origin_info.slideId;
                  var origin_contentUrl = slideId_origin_info.contentUrl;
                  incarved_data.OriginID = slideId_for_origin;
                  yestoslideAuto.prototype.insertImageToNewSlides(imageId_for_thumb,current_slides_id,incarved_data,function(slideId_thumb_info){
                
                    try{
                      if(slideId_thumb_info.slideId =="error")
                      {
                        window.document.getElementById("sunny_spinner").classList.add("d-none");
                        window.document.getElementById("spinner_label").classList.add("d-none");
                        window.document.getElementById("spinner_label").innerHTML ="";
                        alert("uploading fail");
                        callback(false);
    
                        return;
                      }
                    }
                    catch(err)
                    {
                      window.document.getElementById("sunny_spinner").classList.add("d-none");
                      window.document.getElementById("spinner_label").classList.add("d-none");
                      window.document.getElementById("spinner_label").innerHTML ="";
                      alert("uploading fail");
                      callback(false);
    
                      return;
                    }
                   
                    console.log("thumb_slide_id",slideId_thumb_info.slideId);
                    if(slideId_thumb_info.slideId != "" || true)
                    {


                      var slideId_for_thumb = slideId_thumb_info.slideId;
                      var thumb_contentUrl = slideId_thumb_info.contentUrl;

                      if(slideId_for_thumb != "" && slideId_for_origin != "")
                      {
                        console.log("slideId_for_thumb:",slideId_for_thumb);
                        console.log("slideId_for_origin:",slideId_for_origin);
                        console.log("thumb_contentUrl:",thumb_contentUrl);
                        console.log("origin_contentUrl:",origin_contentUrl);
                        window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/newly_added_slide/'+ window.sha256(fname)).update({
                          slideId_for_thumb:slideId_for_thumb,
                          //slideId_for_thumb:"",
                          thumb_contentUrl: thumb_contentUrl,
                          slideId_for_origin:slideId_for_origin,
                          origin_contentUrl: origin_contentUrl,
                          msg_present: sunny_slides_sheets.get_message_slide_for_history()
                        });

                        yestoslideAuto.prototype.add_record_v2(ctime,slideId_for_thumb, current_slides_id, slideId_for_origin,current_orignial_slides_id,msg,imageId_for_origin,imageId_for_thumb,"Image");

                        sunny_slides_sheets.add_commment_to_personal_database_using_slides(msg,slideId_for_thumb,slideId_for_origin,function(rst){

                          console.log(rst);
                          callback(true);
                        });
  
                      }
                      else
                      {
                        console.log("could not get slideId");
                        console.log("slideId_for_thumb",slideId_for_thumb);
                        console.log("slideId_for_origin",slideId_for_origin);
                        window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/newly_added_slide/'+ window.sha256(fname)).update({
                          slideId_for_thumb:slideId_for_thumb,
                          slideId_for_origin:slideId_for_origin,
                          msg_present: sunny_slides_sheets.get_message_slide_for_history()
                          
                        });
                        callback(true);
                        
                      }
                    }
                    else
                    {
                      window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/newly_added_slide/'+ window.sha256(fname)).update({
                        slideId_for_thumb:"fail",
                        slideId_for_origin:"fail"
                        
                      });
                      alert("fail to create slide1");
                    }
                    try{
                      window.document.getElementById("sunny_spinner").classList.add("d-none");
                      window.document.getElementById("spinner_label").classList.add("d-none");
                      window.document.getElementById("spinner_label").innerHTML ="";
                    }
                    catch(err)
                    {

                    }
                    
                  })
                }
                
              })
              return;
            
             

            }
            else
            {
              var current_web_region = navigator.language;
              if(current_web_region.indexOf("ko") != -1)
                window.sunny_modal.show_alert_only("이미지 처리 실패,<br>다시 시도하세요",false,311,150,4);
              else              
                window.sunny_modal.show_alert_only("Fail to upload image,<br>Please try again",false,311,150,4);
              
                window.sunny_modal.hide_spinner();
                callback(false);
            }
          });
        }
        else
        {
          var current_web_region = navigator.language;
          if(current_web_region.indexOf("ko") != -1)
            window.sunny_modal.show_alert_only("이미지 처리 실패,<br>다시 시도하세요",false,311,150,4);
          else              
            window.sunny_modal.show_alert_only("Fail to upload image,<br>Please try again",false,311,150,4);

          window.sunny_modal.hide_spinner();  
          callback(false);
        }
      });


    };
 
    yestoslideAuto.prototype.send_to_teacher_for_client_photo_using_apps_script = function(data_picture, callback)
    {
      
       data_picture = data_picture.replace("data:image/jpeg;base64,","");
       
       
    
       //data_picture = "iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=";
    
    
      
       var url = window.sunny.get_apps_script_link_for_presentation();
       
       var http = new XMLHttpRequest();
       
       //var u = window.get_currentUser();
       
       //console.log(window.sunny.get_current_sharing_folder());
       
       var b64_obj = {
         b64: data_picture
       }
       
       
       
       var b64_obj_str = JSON.stringify(b64_obj);
       
       
       
       //console.log(b64_obj_str);
       b64_obj_str = encodeURIComponent(b64_obj_str);
      
       
       var fname= "test.jpg";
       var shared_photos_folder_id = "13JJpjdJeKrLOpInw1Ce-qFXrKAROTNLh";
       var images_slideID = current_orignial_slides_id;
       //var params = "copy_one_blob_to_sharing_folder=xxx"+"&b64_obj_str="+b64_obj_str+"&fname="+fname+"&sharing_folder_id="+shared_photos_folder_id+"&deckId="+images_slideID;
       var params = "copy_one_blob_to_sharing_folder=xxx"+"&b64_obj_str="+b64_obj_str+"&fname="+fname+"&sharing_folder_id="+shared_photos_folder_id+"&deckId="+images_slideID;
       
       
       //console.log(params);
      
       http.open("POST", url, true);
       
       //Send the proper header information along with the request
       http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
       
       //Call a function when the state changes.
       http.onreadystatechange = function() {
         if (http.readyState==4) {
         //alert the user that a response now exists in the responseTest property.
         //console.log("created slideID: ",http.responseText);
       
         //console.log(http.responseText);
         if(http.responseText.indexOf("error:") != -1)
         {
           alert(http.responseText);
           var info = {
           imgId : ""
           }
           callback(info);
         }
         else if(http.responseText =="")
         {
           var info = {
           imgId : "",
           }
           callback(info);
         }
         else
         {
            
           //console.log(http.responseText);
           //console.log(JSON.parse(http.responseText));
           
           callback(JSON.parse(http.responseText));
           
         }
         
         newly_uploaded_fileId = "";
         // And to view in firebug
         //  console.log('xhr',xmlhttp)
         }
       } // end callback
       
       http.send(params);
    }
    
    
    yestoslideAuto.prototype.insert_image_into_deck= function(imageId,images_slideID,callback){
      
       var url = apps_script_for_image_control;
       
       var http = new XMLHttpRequest();
       
       
       imageId = encodeURIComponent(imageId);
       images_slideID = encodeURIComponent(images_slideID);
       var data = my_idinfo_v2+"-"+my_nameinfo_v2;
       //console.log("insert_image_into_slide=xxx"+"&imageId="+imageId+"&deckId="+images_slideID+"&data="+data);
       data = encodeURIComponent(data);
       var params = "insert_image_into_slide_v2=xxx"+"&imageId="+imageId+"&deckId="+images_slideID+"&data="+data;
       
       
       //console.log(params);
      
    
       http.open("POST", url, true);
       
       //Send the proper header information along with the request
       http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
       
       //Call a function when the state changes.
       http.onreadystatechange = function() {
         if (http.readyState==4) {
         //alert the user that a response now exists in the responseTest property.
         //console.log("created slideID: ",http.responseText);
       
         console.log(http.responseText);
         if(http.responseText.indexOf("error:") != -1)
         {
           console.log(http.responseText);
           var info = {
           imgId : ""
           }
           callback(info);
         }
         else if(http.responseText =="")
         {
           var info = {
           imgId : "",
           }
           callback(info);
         }
         else
         {
            
           //console.log(http.responseText);
           //console.log(JSON.parse(http.responseText));
           
           
           callback(JSON.parse(http.responseText));
           
         }
         
        
         }
       } // end callback
       
       http.send(params);
    }
    
    var uploading_timer = null;
    var comment_added_for_multiple_upload = false;
    yestoslideAuto.prototype.get_comment_added_for_multiple_upload = function()
    {
      return comment_added_for_multiple_upload;
    }
    yestoslideAuto.prototype.set_comment_added_for_multiple_upload = function(flag)
    {
      comment_added_for_multiple_upload = flag;
    }
    yestoslideAuto.prototype.uploadToGD_base64_using_apps_script = function(canvas,msg,orgData="",mimetype,is_coordi,total_files=1,file_idx=0,original_image_time,current_image_size,callback)
    {
      //console.log(canvas);
 
      var encoderOptions = 1.0;
      var data_picture = canvas.toDataURL("image/jpeg",encoderOptions);
      if(data_picture.length <100)
      {

        try
        {

          canvas.remove();
        }
        catch(err)
        {

        }
        if(total_files ==1)
        {
          var current_web_region = navigator.language;
          if(current_web_region.indexOf("ko") != -1)
          {
            alert("업로드할 데이터가 없습니다");
          }
          else
            alert("no image data to upload");
  
          callback(true);
        }
        else
        {
          callback(false);
        }
        
          
        return;
      }

    
      
      
      console.log("org: ",data_picture.length);
      
      //data_picture = canvas.toDataURL("image/jpeg",encoderOptions);
      var max_pixels = 2000 * 1024;
      if(current_image_size== 2880)
      {
        max_pixels = 3000 * 1024; //2.0M

      }
      else if(current_image_size == 1920)
      {
        max_pixels = 2000 * 1024;
      }
      else
      {
        max_pixels = 1000 * 1024;
      }
      //max_pixels = 500 * 1024;
      //console.log("current_image_size",current_image_size,"max_pixels",max_pixels);

      while(data_picture.length  > max_pixels ) 
      {
        encoderOptions= encoderOptions - 0.03;
        console.log(encoderOptions);
        data_picture = canvas.toDataURL('image/jpeg', encoderOptions);
        console.log(data_picture.length);
        //alert(data_to_be_sent.length);
        if(data_picture.length  < max_pixels  || encoderOptions < 0)
        {
          break;
        }
    
        
        
      }
      //console.log(data_picture);


      try
      {

        canvas.remove();
      }
      catch(err)
      {

      }
      var time_passed = 0;
      var upload_success_or_faile = false;
      

      try
      {
        clearInterval(uploading_timer);
      }
      catch(err)
      {

        console.log(err.message);
      }
      uploading_timer = setInterval(() => {
      
        console.log(time_passed,upload_success_or_faile);
        if(upload_success_or_faile)
        {
          clearInterval(uploading_timer);
        }
        else
        {
          time_passed = time_passed + 3000;
          if(time_passed >= 3000* 10)
          {
            clearInterval(uploading_timer);
            callback(false);

          }

        }


      }, 3000);

      if(total_files ==1)
      {
        window.sunny_modal.show_spinner("사진 올리기");
      }
      else
      {
        window.sunny_modal.show_spinner("Image "+ (file_idx+1)+"/"+total_files);
      }
      
      
      data_picture = data_picture.replace("data:image/jpeg;base64,","");
      
  
    
      var url = window.sunny.get_apps_script_link_for_presentation();
      
      var http = new XMLHttpRequest();
      
      //var u = window.get_currentUser();
      
      //console.log(window.sunny.get_current_sharing_folder());
      
      var b64_obj = {
        b64: data_picture
      }
      

      
      var b64_obj_str = JSON.stringify(b64_obj);
      
      b64_obj_str = encodeURIComponent(b64_obj_str);
      
       
      console.log(window.current_profile);
      
      var d = new Date();
      var ctime = d.YYYYMMDDHHMMSS();
      var incarved_data = {
        ctime:ctime,
        msg:msg,
        imageId_for_origin:"",
        imageId_for_thumb:"",
        Email:window.current_profile.email,
        Name:window.current_profile.name,
        ProfileImage:window.current_profile.picture,
        orginPresent:current_orignial_slides_id,
        thumbPresent:current_slides_id,
        original_image_time:original_image_time,
        kind:"Image"
      }

      console.log(incarved_data);
      var incarved_data_str = JSON.stringify(incarved_data);
      incarved_data_str = encodeURIComponent(incarved_data_str);
       

      var params = "insertImageFromBase64IntoSlide=xxx"+"&deckId="+current_orignial_slides_id+"&incarved_data="+incarved_data_str+"&b64_obj_str="+b64_obj_str;
       

       
       //console.log(params);
       
       
       
      
       http.open("POST", url, true);
       
       //Send the proper header information along with the request
       http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
       
       //Call a function when the state changes.
       http.onreadystatechange = function() {
         if (http.readyState==4) {


          console.log(http.responseText);
          //console.log(JSON.parse(http.responseText));
          
          if(http.responseText.indexOf("error") != -1)
          {
            //alert(http.responseText);
            var info = {
            imgId : ""
            }
            upload_success_or_faile =true;
            callback(false);
            
          }
          else if(http.responseText =="")
          {
            var info = {
            imgId : "",
            }
            upload_success_or_faile =true;
            callback(false);
          }
          else
          {
              
            //console.log(http.responseText);
            //console.log(JSON.parse(http.responseText));
              var rst = http.responseText;

              rst = JSON.parse(rst);
              console.log(rst);
              console.log(rst.incarved_data);
              
              var slideId_for_origin = rst.slideId;
              var slideId_for_thumb = rst.slideId;
              incarved_data.imageId_for_origin = rst.slideId;
              incarved_data.imageId_for_thumb = rst.slideId;
              incarved_data.OriginID = rst.slideId;
              console.log(rst.contentUrl);
              var revised_contentUrl = rst.contentUrl.replace("=s2048","")+ window.sunny_images.get_thumbnail_postfix();
                //revised_contentUrl = rst.contentUrl;
              var imagesInSharing ={
                //orgimg_in_sharing: imageId_for_origin,
                //thumbimg_in_sharing:imageId_for_thumb,
                orgimg_in_sharing: rst.slideId,
                thumbimg_in_sharing:rst.slideId,
                contentUrl:revised_contentUrl,
                incarved_data:JSON.stringify(incarved_data)

              }
              
              console.log(imagesInSharing);

              
              window.sunny.update_sharing_images_info(imagesInSharing,"fname",msg);
              //새이미지 알람 보냄
              sunny_search.set_new_image_arrived(current_orignial_slides_id);

              sunny_search.update_new_slide_to_chromecast(incarved_data.OriginID);
                      
              if(!is_coordi)
              {
                if(!window.sunny.get_comment_added_for_multiple_upload())
                {
                  sunny_slides_sheets.add_commment_to_personal_database_using_slides(msg,slideId_for_thumb,slideId_for_origin,function(rst){
                    console.log("add_commment_to_personal_database_using_slides");
                    console.log(rst);
                    if(rst =="ok")
                    {
                      window.sunny.set_comment_added_for_multiple_upload(true);
                    }
  
                  });
                }
                
              }
              
            upload_success_or_faile =true;
            callback(true);
            
          }
          
          newly_uploaded_fileId = "";
         
         }
       } // end callback
       
       http.send(params);
    }

    yestoslideAuto.prototype.uploadToGD_base64_resumable = function(base64,msg,orgData="",mimetype,is_coordi,callback)
    {
      

      if(base64.length <100)
      {
          alert("no image data to upload");
          callback(true);
          
          return;
      }

     

      var d = new Date();
      var ctime = d.YYYYMMDDHHMMSS();
      uploaded_image_cnt++;
      var fname = "yestoslide"+"-"+d.YYYYMMDDHHMMSS()+"-"+uploaded_image_cnt.toString()+".jpg";
      var org_fname = fname.replace(".jpg","_original.jpg");

      var imageId_for_thumb= "";
      var imageId_for_origin = "";
      var slideId_for_thumb = "";
      var slideId_for_origin = "";

      window.sunny_modal.show_spinner("사진 올리기");

      window.sunny_resumable.upload_resumable(base64,msg,orgData,mimetype,org_fname,is_coordi,function(fid){

        
        

        //console.log(fid);
        if(fid != "")
        {
          console.log(fid);
          
                   
          if(window.sunny.is_original_slide_only())
          {
            window.sunny_modal.show_spinner("이미지 데크에 추가");
            window.sunny.add_to_deck_using_imageFileId(fid,org_fname,true,current_orignial_slides_id,function(rst){
  
              window.sunny.delete_a_File(fid,function(is_deleted){
                console.log(is_deleted);
              });

              console.log(rst);
             
              if(rst.imgId =="" || rst.slideId=="" || typeof rst.error != "undefined")
              {
                window.sunny_modal.hide_spinner();
                try{
                  console.log(rst.error);
                }
                catch(err)
                {

                }
                
                console.log("uploading fail");
                callback(false);
                  
                return;
              }
              imageId_for_origin = rst.imgId;
              imageId_for_thumb = rst.imgId;
              slideId_for_origin = rst.slideId;
              slideId_for_thumb = rst.slideId;
    
              if(imageId_for_origin == null || typeof imageId_for_origin ==="undefined" || imageId_for_thumb == null || typeof imageId_for_thumb ==="undefined")
              {
                window.sunny_modal.hide_spinner();
                console.log("uploading fail");
                callback(false);
                  
                return;
              }
              window.sunny_modal.show_spinner("마무리");
              
    
    
              
              //var user = window.gapi.auth2.getAuthInstance().currentUser.get();
              //var profile = user.getBasicProfile();
              var incarved_data = {
                ctime:ctime,
                msg:msg,
                imageId_for_origin:imageId_for_origin,
                imageId_for_thumb:imageId_for_thumb,
                Email:window.current_profile.email,
                Name:window.current_profile.name,
                ProfileImage:window.current_profile.picture,
                orginPresent:current_orignial_slides_id,
                thumbPresent:current_slides_id,
                kind:"Image"
              }
    
              incarved_data.OriginID = slideId_for_origin;
              incarved_data.ID = slideId_for_thumb;
              console.log(incarved_data);

              console.log(rst.contentUrl.replace("=s2048","")+ window.sunny_images.get_thumbnail_postfix());
              var revised_contentUrl = rst.contentUrl.replace("=s2048","")+ window.sunny_images.get_thumbnail_postfix();
              //revised_contentUrl = rst.contentUrl;
              var imagesInSharing ={
                //orgimg_in_sharing: imageId_for_origin,
                //thumbimg_in_sharing:imageId_for_thumb,
                orgimg_in_sharing: rst.contentUrl,
                thumbimg_in_sharing:rst.contentUrl,
                contentUrl:revised_contentUrl,
                incarved_data:JSON.stringify(incarved_data)

              }
              
              console.log(imagesInSharing);

              //window.sunny_images.getThumbnail(current_orignial_slides_id,slideId_for_origin,function(thumb){

                //console.log(thumb);
                //imagesInSharing.contentUrl = thumb.result.contentUrl;
                window.sunny.update_sharing_images_info(imagesInSharing,fname,msg);

                
                window.sunny.insert_incarved_data(current_slides_id,slideId_for_thumb,current_orignial_slides_id,slideId_for_origin,incarved_data,function(rst){
      
                  
                  console.log(rst);
                  //window.sunny_modal.hide_spinner();
                  if(rst.rst != "success")
                  {
                    
                    window.sunny_modal.hide_spinner();
                    console.log("uploading fail");
                    callback(false);
                    return;
                  }
                  else
                  {


                    //새이미지 알람 보냄
                    sunny_search.set_new_image_arrived(current_orignial_slides_id);
                    
                    if(!is_coordi)
                    {
                      sunny_slides_sheets.add_commment_to_personal_database_using_slides(msg,slideId_for_thumb,slideId_for_origin,function(rst){
      
                  
                        console.log("add_commment_to_personal_database_using_slides");
                        console.log(rst);
                        callback(true);
                      });
                    }
                    else
                    {
                      callback(true);
                    }
                   
                  }
      
                });
              //});
  
              
            });
    
          }
          
        }
        else
        {
          window.sunny_modal.hide_spinner();
          //alert("failed in image uploading");
          callback(false);
        }
      });
      return;

      if(window.sunny.is_image_and_insert_to_deck_at_once())
      {
        if(window.sunny.is_original_slide_only())
        {
          window.sunny.copy_one_blob_to_sharing_folder_and_add_to_deck(orgData,fname,true,current_orignial_slides_id,function(rst){

            console.log(rst);
            if(rst.imgId =="" || rst.slideId=="")
            {
              window.sunny_modal.hide_spinner();
              console.log("uploading fail");
              callback(false);
                
              return;
            }
            imageId_for_origin = rst.imgId;
            imageId_for_thumb = rst.imgId;
            slideId_for_origin = rst.slideId;
            slideId_for_thumb = rst.slideId;
  
            if(imageId_for_origin == null || typeof imageId_for_origin ==="undefined" || imageId_for_thumb == null || typeof imageId_for_thumb ==="undefined")
            {
              window.sunny_modal.hide_spinner();
              console.log("uploading fail");
              callback(false);
                
              return;
            }
            window.sunny_modal.show_spinner("마무리");
            var imagesInSharing ={
              orgimg_in_sharing: imageId_for_origin,
              thumbimg_in_sharing:imageId_for_thumb
            }
            
            console.log(imagesInSharing);
            window.sunny.update_sharing_images_info(imagesInSharing,fname,msg);
  
  
            
            var user = window.gapi.auth2.getAuthInstance().currentUser.get();
            var profile = user.getBasicProfile();
            var incarved_data = {
              ctime:ctime,
              msg:msg,
              imageId_for_origin:imageId_for_origin,
              imageId_for_thumb:imageId_for_thumb,
              Email:profile.getEmail(),
              Name:profile.getName(),
              ProfileImage:profile.getImageUrl(),
              orginPresent:current_orignial_slides_id,
              thumbPresent:current_slides_id,
              kind:"Image"
            }
  
            incarved_data.OriginID = slideId_for_origin;
            incarved_data.ID = slideId_for_thumb;
            console.log(incarved_data);
            window.sunny.insert_incarved_data(current_slides_id,slideId_for_thumb,current_orignial_slides_id,slideId_for_origin,incarved_data,function(rst){
  
              
              console.log(rst);
              window.sunny_modal.hide_spinner();
              if(rst.rst != "success")
              {
                
                window.sunny_modal.hide_spinner();
                console.log("uploading fail");
                callback(false);
                return;
              }
              else
              {
  
                sunny_slides_sheets.add_commment_to_personal_database_using_slides(msg,slideId_for_thumb,slideId_for_origin,function(rst){
  
              
                  console.log("add_commment_to_personal_database_using_slides");
                  console.log(rst);
                  callback(true);
                });
              }
  
            });
            
          });
  
        }
        else
        {

          window.sunny.copy_blobs_to_sharing_folder_and_add_to_deck(orgData,base64,fname,current_orignial_slides_id,current_slides_id,function(rst){

            if(rst.imgId =="" || rst.slideId=="")
            {
              window.sunny_modal.hide_spinner();
              console.log("uploading fail");
              callback(false);
                
              return;
            }
            imageId_for_origin = rst.imgId;
            imageId_for_thumb = rst.imgId_thumb;
            slideId_for_origin = rst.slideId;
            slideId_for_thumb = rst.slideId_thumb;
  
            var imagesInSharing ={
              orgimg_in_sharing: imageId_for_origin,
              thumbimg_in_sharing:imageId_for_thumb
            }
            
            console.log(imagesInSharing);
            window.sunny.update_sharing_images_info(imagesInSharing,fname,msg);
  
  
            
            var user = window.gapi.auth2.getAuthInstance().currentUser.get();
            var profile = user.getBasicProfile();
            var incarved_data = {
              ctime:ctime,
              msg:msg,
              imageId_for_origin:imageId_for_origin,
              imageId_for_thumb:imageId_for_thumb,
              Email:profile.getEmail(),
              Name:profile.getName(),
              ProfileImage:profile.getImageUrl(),
              orginPresent:current_orignial_slides_id,
              thumbPresent:current_slides_id,
              kind:"Image"
            }
  
            incarved_data.OriginID = slideId_for_origin;
            incarved_data.ID = slideId_for_thumb;
            console.log(incarved_data);
            window.sunny.insert_incarved_data(current_slides_id,slideId_for_thumb,current_orignial_slides_id,slideId_for_origin,incarved_data,function(rst){
  
              
              console.log(rst);
              window.sunny_modal.hide_spinner();
              if(rst.rst != "success")
              {
                
                window.sunny_modal.hide_spinner();
                console.log("uploading fail");
                callback(false);
                return;
              }
              else
              {
  
                sunny_slides_sheets.add_commment_to_personal_database_using_slides(msg,slideId_for_thumb,slideId_for_origin,function(rst){
  
              
                  console.log("add_commment_to_personal_database_using_slides");
                  console.log(rst);
                  callback(true);
                });
              }
  
            });
            
          });  
        }
      }
      else
      {
        var error_in_copy_one_blob_to_sharing_folder = false;
        var get_thumb_answer_from_copy_one_blob_to_sharing_folder = false;
        var get_org_answer_from_copy_one_blob_to_sharing_folder = false;
  
        window.sunny.copy_one_blob_to_sharing_folder(orgData,fname,true,function(imginfo){
          console.log(imginfo);
          if(imginfo.imgId =="")
          {
            error_in_copy_one_blob_to_sharing_folder = true;
          }
          else
            imageId_for_origin = imginfo.imgId;
  
          get_org_answer_from_copy_one_blob_to_sharing_folder =true;
          
          
        });
  
        window.sunny.copy_one_blob_to_sharing_folder(base64,fname,false,function(imginfo){
  
          console.log(imginfo);
          if(imginfo.imgId =="")
          {
            error_in_copy_one_blob_to_sharing_folder = true;
          }
          else
          {
            imageId_for_thumb=  imginfo.imgId;
            console.log(imageId_for_thumb);
          }
            
          
          get_thumb_answer_from_copy_one_blob_to_sharing_folder =true;
  
          var check_error = setInterval(() => {
            
            if(error_in_copy_one_blob_to_sharing_folder)
            {
  
              clearInterval(check_error);
              window.sunny_modal.hide_spinner();
              console.log("uploading fail");
              callback(false);
              return;
  
            }
            if(get_org_answer_from_copy_one_blob_to_sharing_folder && get_thumb_answer_from_copy_one_blob_to_sharing_folder)
            {
  
              clearInterval(check_error);
              window.sunny_modal.hide_spinner();
              if(window.sunny.is_original_slide_only())
              {
                imageId_for_thumb = imageId_for_origin;
              }
              var imagesInSharing ={
                orgimg_in_sharing: imageId_for_origin,
                thumbimg_in_sharing:imageId_for_thumb
              }
              
              console.log(imagesInSharing);
              window.sunny.update_sharing_images_info(imagesInSharing,fname,msg);
  
              console.log("Do not leave..");
              window.sunny_modal.show_spinner("마무리");
              
  
              console.log(current_orignial_slides_id,current_slides_id);
              var error_in_insertImageToNewSlides_without_incarved_data = false;
              
              
              yestoslideAuto.prototype.insertImageToNewSlides_without_incarved_data(false,imageId_for_thumb,current_slides_id,function(slideId_thumb_info){
  
                console.log(slideId_thumb_info);
                if(slideId_thumb_info.slideId =="")
                {
                  error_in_insertImageToNewSlides_without_incarved_data = true;
                }
                else
                {
                  if(!window.sunny.is_original_slide_only())
                    slideId_for_thumb = slideId_thumb_info.slideId;
                }
                var check_error = setInterval(() => {
  
                  //console.log(slideId_for_thumb,slideId_for_origin);
                  if(error_in_insertImageToNewSlides_without_incarved_data)
                  {
                    clearInterval(check_error);
                    window.sunny_modal.hide_spinner();
                    console.log("uploading fail");
                    callback(false);
                    return;
                  }
                  console.log("thumb ",slideId_for_thumb,"org ",slideId_for_origin);
                  if(slideId_for_thumb != "" &&  slideId_for_origin != "")
                  {
                    if(window.sunny.is_original_slide_only())
                      slideId_for_thumb = slideId_for_origin;

                    clearInterval(check_error);
                    
  
                    var user = window.gapi.auth2.getAuthInstance().currentUser.get();
                    var profile = user.getBasicProfile();
                    var incarved_data = {
                      ctime:ctime,
                      msg:msg,
                      imageId_for_origin:imageId_for_origin,
                      imageId_for_thumb:imageId_for_thumb,
                      Email:profile.getEmail(),
                      Name:profile.getName(),
                      ProfileImage:profile.getImageUrl(),
                      orginPresent:current_orignial_slides_id,
                      thumbPresent:current_slides_id,
                      kind:"Image"
                    }
  
                    incarved_data.OriginID = slideId_for_origin;
                    incarved_data.ID = slideId_for_thumb;
                    console.log(incarved_data);
                    window.sunny.insert_incarved_data(current_slides_id,slideId_for_thumb,current_orignial_slides_id,slideId_for_origin,incarved_data,function(rst){
  
                      
                      console.log(rst);
                      window.sunny_modal.hide_spinner();
                      if(rst.rst != "success")
                      {
                       
                        window.sunny_modal.hide_spinner();
                        console.log("uploading fail");
                        callback(false);
                        return;
                      }
                      else
                      {
  
                        sunny_slides_sheets.add_commment_to_personal_database_using_slides(msg,slideId_for_thumb,slideId_for_origin,function(rst){
  
                      
                          console.log("add_commment_to_personal_database_using_slides");
                          console.log(rst);
                          callback(true);
                        });
                      }
  
                    });
                  }
                }, 100);
                
              });
  
              yestoslideAuto.prototype.insertImageToNewSlides_without_incarved_data(true,imageId_for_origin,current_orignial_slides_id,function(slideId_origin_info){
  
                console.log(slideId_origin_info);
                if(slideId_origin_info.slideId =="")
                {
                  error_in_insertImageToNewSlides_without_incarved_data = true;
                }
                else
                {
                  
                  console.log("insertImageToNewSlides_without_incarved_data imgorg 성공");
                  slideId_for_origin = slideId_origin_info.slideId;
                  if(window.sunny.is_original_slide_only())
                  {
                    slideId_for_thumb = slideId_origin_info.slideId;
                  }
                  
                    
                }
              });
  
  
  
  
  
              
            }
          }, 500);
  
        });
      }





      return;
      window.sunny.copy_blobs_to_sharing_folder(base64,orgData,fname,org_fname,function(imagesInSharing){
        console.log(imagesInSharing);

        console.log("Do not leave..");
        window.sunny_modal.show_spinner("마무리");
        var user = window.gapi.auth2.getAuthInstance().currentUser.get();
        var profile = user.getBasicProfile();
        var incarved_data = {
          ctime:ctime,
          msg:msg,
          imageId_for_origin:imageId_for_origin,
          imageId_for_thumb:imageId_for_thumb,
          Email:profile.getEmail(),
          Name:profile.getName(),
          ProfileImage:profile.getImageUrl(),
          orginPresent:current_orignial_slides_id,
          thumbPresent:current_slides_id,
          kind:"Image"
        }

        if(imagesInSharing.orgimg_in_sharing =="" || imagesInSharing.thumbimg_in_sharing =="")
        {
          window.sunny_modal.hide_spinner();
          alert("uploading fail");
          callback(false);
          return;
        }
        else
        {
          imageId_for_thumb= imagesInSharing.thumbimg_in_sharing;
          imageId_for_origin = imagesInSharing.orgimg_in_sharing;
          window.sunny.update_sharing_images_info(imagesInSharing,fname,msg);
                            
        }

        
        yestoslideAuto.prototype.insertImageToNewSlides(imageId_for_origin,current_orignial_slides_id,incarved_data,function(slideId_origin_info){
        
          try{
            if(slideId_origin_info.slideId =="error")
            {
              window.sunny_modal.hide_spinner();
              alert("uploading fail");
              callback(false);

              return;
            }
          }
          catch(err)
          {
            window.sunny_modal.hide_spinner();
            alert("uploading fail");
            callback(false);

            return;
          }
          
          window.sunny_modal.show_spinner("마무리 중..");
          
          
          console.log("original",slideId_origin_info.slideId);
          if(slideId_origin_info.slideId != "" || true)
          {
            var slideId_for_origin = slideId_origin_info.slideId;
            var origin_contentUrl = slideId_origin_info.contentUrl;
            incarved_data.OriginID = slideId_for_origin;
            yestoslideAuto.prototype.insertImageToNewSlides(imageId_for_thumb,current_slides_id,incarved_data,function(slideId_thumb_info){
          
              try{
                if(slideId_thumb_info.slideId =="error")
                {
                  window.sunny_modal.hide_spinner();
                  alert("uploading fail");
                  callback(false);

                  return;
                }
              }
              catch(err)
              {
                window.sunny_modal.hide_spinner();
                alert("uploading fail");
                callback(false);

                return;
              }
              
              console.log("thumb_slide_id",slideId_thumb_info.slideId);
              if(slideId_thumb_info.slideId != "" || true)
              {


                var slideId_for_thumb = slideId_thumb_info.slideId;
                var thumb_contentUrl = slideId_thumb_info.contentUrl;

                if(slideId_for_thumb != "" && slideId_for_origin != "")
                {
                  console.log("slideId_for_thumb:",slideId_for_thumb);
                  console.log("slideId_for_origin:",slideId_for_origin);
                  console.log("thumb_contentUrl:",thumb_contentUrl);
                  console.log("origin_contentUrl:",origin_contentUrl);
                  var email_hash = window.sha256(coordinator_email);
                  window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/newly_added_slide/'+ window.sha256(fname)).update({
                    slideId_for_thumb:slideId_for_thumb,
                    //slideId_for_thumb:"",
                    thumb_contentUrl: thumb_contentUrl,
                    slideId_for_origin:slideId_for_origin,
                    origin_contentUrl: origin_contentUrl,
                    msg_present: sunny_slides_sheets.get_message_slide_for_history()
                  });

                  //yestoslideAuto.prototype.add_record_v2(ctime,slideId_for_thumb, current_slides_id, slideId_for_origin,current_orignial_slides_id,msg,imageId_for_origin,imageId_for_thumb,"Image");

                  sunny_slides_sheets.add_commment_to_personal_database_using_slides(msg,slideId_for_thumb,slideId_for_origin,function(rst){

                    
                    console.log("add_commment_to_personal_database_using_slides");
                    console.log(rst);
                    callback(true);
                  });

                }
                else
                {
                  console.log("could not get slideId");
                  console.log("slideId_for_thumb",slideId_for_thumb);
                  console.log("slideId_for_origin",slideId_for_origin);
                  window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/newly_added_slide/'+ window.sha256(fname)).update({
                    slideId_for_thumb:slideId_for_thumb,
                    slideId_for_origin:slideId_for_origin,
                    msg_present: sunny_slides_sheets.get_message_slide_for_history()
                    
                  });
                  callback(true);
                  
                }
              }
              else
              {
                window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/newly_added_slide/'+ window.sha256(fname)).update({
                  slideId_for_thumb:"fail",
                  slideId_for_origin:"fail"
                  
                });
                alert("fail to create slide1");
              }
              try{
                window.document.getElementById("sunny_spinner").classList.add("d-none");
                window.document.getElementById("spinner_label").classList.add("d-none");
                window.document.getElementById("spinner_label").innerHTML ="";
              }
              catch(err)
              {

              }
              
            })
          }
          
        })



      });
     
     
      return;
      
      //data_picture = base64;
      window.sunny_modal.show_spinner("사진 올리기");
      
      //var d = yestoslideAuto.prototype.getTimestamp_selfi_controller();
      var d = new Date();
      uploaded_image_cnt++;
      var fname = "yestoslide"+"-"+d.YYYYMMDDHHMMSS()+"-"+uploaded_image_cnt.toString()+".jpg";

      var imageId_for_thumb= "";
      var imageId_for_origin = "";
      var slideId_for_thumb = "";
      var slideId_for_origin = "";
      
      //for thumb image
      yestoslideAuto.prototype.upload_with_email(base64,fname,function(fid){
        if(fid !="")
        {
          imageId_for_thumb =fid;
          //fname = "yestoslide"+"-"+d.YYYYMMDDHHMMSS()+"-"+uploaded_image_cnt.toString()+"_orginal.jpg";
          fname = fname.replace(".jpg","_original.jpg");
          console.log(fname);

          yestoslideAuto.prototype.upload_with_email(orgData,fname,function(fid){
            if(fid !="")
            {
              imageId_for_origin = fid;

              try
              {
                window.document.getElementById("sunny_spinner").classList.add("d-none");
              }
              catch(err)
              {

              }

                
             
              console.log("Do not leave..");
              window.sunny_modal.show_spinner("마무리");


              var user = window.gapi.auth2.getAuthInstance().currentUser.get();
              var profile = user.getBasicProfile();
              var incarved_data = {
                ctime:ctime,
                msg:msg,
                imageId_for_origin:imageId_for_origin,
                imageId_for_thumb:imageId_for_thumb,
                Email:profile.getEmail(),
                Name:profile.getName(),
                ProfileImage:profile.getImageUrl(),
                orginPresent:current_orignial_slides_id,
                thumbPresent:current_slides_id,
                kind:"Image"
              }

              window.sunny.copy_imgages_to_sharing_folder(imageId_for_origin,imageId_for_thumb,function(imagesInSharing){
                console.log(imagesInSharing);
                if(imagesInSharing.orgimg_in_sharing =="" || imagesInSharing.thumbimg_in_sharing =="")
                {
                  window.sunny_modal.hide_spinner();
                  alert("uploading fail");
                  callback(false);
                  return;
                }
                else
                {
                  window.sunny.update_sharing_images_info(imagesInSharing,fname,msg);
                                    
                }
                yestoslideAuto.prototype.insertImageToNewSlides(imageId_for_origin,current_orignial_slides_id,incarved_data,function(slideId_origin_info){
                
                  try{
                    if(slideId_origin_info.slideId =="error")
                    {
                      window.sunny_modal.hide_spinner();
                      alert("uploading fail");
                      callback(false);
  
                      return;
                    }
                  }
                  catch(err)
                  {
                    window.sunny_modal.hide_spinner();
                    alert("uploading fail");
                    callback(false);
  
                    return;
                  }
                  
                  window.sunny_modal.show_spinner("마무리 중..");
                  
                  
                  console.log("original",slideId_origin_info.slideId);
                  if(slideId_origin_info.slideId != "" || true)
                  {
                    var slideId_for_origin = slideId_origin_info.slideId;
                    var origin_contentUrl = slideId_origin_info.contentUrl;
                    incarved_data.OriginID = slideId_for_origin;
                    yestoslideAuto.prototype.insertImageToNewSlides(imageId_for_thumb,current_slides_id,incarved_data,function(slideId_thumb_info){
                  
                      try{
                        if(slideId_thumb_info.slideId =="error")
                        {
                          window.sunny_modal.hide_spinner();
                          alert("uploading fail");
                          callback(false);
      
                          return;
                        }
                      }
                      catch(err)
                      {
                        window.sunny_modal.hide_spinner();
                        alert("uploading fail");
                        callback(false);
      
                        return;
                      }
                     
                      console.log("thumb_slide_id",slideId_thumb_info.slideId);
                      if(slideId_thumb_info.slideId != "" || true)
                      {
  
  
                        var slideId_for_thumb = slideId_thumb_info.slideId;
                        var thumb_contentUrl = slideId_thumb_info.contentUrl;
  
                        if(slideId_for_thumb != "" && slideId_for_origin != "")
                        {
                          console.log("slideId_for_thumb:",slideId_for_thumb);
                          console.log("slideId_for_origin:",slideId_for_origin);
                          console.log("thumb_contentUrl:",thumb_contentUrl);
                          console.log("origin_contentUrl:",origin_contentUrl);
                          window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/newly_added_slide/'+ window.sha256(fname)).update({
                            slideId_for_thumb:slideId_for_thumb,
                            //slideId_for_thumb:"",
                            thumb_contentUrl: thumb_contentUrl,
                            slideId_for_origin:slideId_for_origin,
                            origin_contentUrl: origin_contentUrl,
                            msg_present: sunny_slides_sheets.get_message_slide_for_history()
                          });
  
                          //yestoslideAuto.prototype.add_record_v2(ctime,slideId_for_thumb, current_slides_id, slideId_for_origin,current_orignial_slides_id,msg,imageId_for_origin,imageId_for_thumb,"Image");
  
                          sunny_slides_sheets.add_commment_to_personal_database_using_slides(msg,slideId_for_thumb,slideId_for_origin,function(rst){
  
                            
                            console.log("add_commment_to_personal_database_using_slides");
                            console.log(rst);
                            callback(true);
                          });
    
                        }
                        else
                        {
                          console.log("could not get slideId");
                          console.log("slideId_for_thumb",slideId_for_thumb);
                          console.log("slideId_for_origin",slideId_for_origin);
                          window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/newly_added_slide/'+ window.sha256(fname)).update({
                            slideId_for_thumb:slideId_for_thumb,
                            slideId_for_origin:slideId_for_origin,
                            msg_present: sunny_slides_sheets.get_message_slide_for_history()
                            
                          });
                          callback(true);
                          
                        }
                      }
                      else
                      {
                        window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/newly_added_slide/'+ window.sha256(fname)).update({
                          slideId_for_thumb:"fail",
                          slideId_for_origin:"fail"
                          
                        });
                        alert("fail to create slide1");
                      }
                      try{
                        window.document.getElementById("sunny_spinner").classList.add("d-none");
                        window.document.getElementById("spinner_label").classList.add("d-none");
                        window.document.getElementById("spinner_label").innerHTML ="";
                      }
                      catch(err)
                      {
  
                      }
                      
                    })
                  }
                  
                })
              })
              



              return;


              /*
              setTimeout(() => {
                //window.sunny_modal.show_alert_only("will make slide- 1",false);
                
              }, 3000);
              setTimeout(() => {
                
                return;
                window.document.getElementById("sunny_spinner").classList.remove("d-none");
                window.document.getElementById("spinner_label").classList.remove("d-none");
                
                var current_web_region = navigator.language;
                if(current_web_region.indexOf("ko") != -1)
                  window.document.getElementById("spinner_label").innerHTML ="<p>슬라이드 만드는 중..</p>";
                else              
                  window.document.getElementById("spinner_label").innerHTML ="<p>Creating Slide</p>";
                
               
              }, 200);
              */
              //alert("upload both success");
              var email_hash = window.sha256(coordinator_email);
              console.log("coordinator_email",coordinator_email);

              var user = window.gapi.auth2.getAuthInstance().currentUser.get();
              var profile = user.getBasicProfile();
              console.log('Full Name: ' + profile.getName());
              console.log('Given Name: ' + profile.getGivenName());
              console.log('Family Name: ' + profile.getFamilyName());
              console.log('Image URL: ' + profile.getImageUrl());
              console.log('Email: ' + profile.getEmail());

              var d = new Date();
              var ctime = d.YYYYMMDDHHMMSS();
              var u = window.get_currentUser();
              var email_hash_me = window.sha256(u.email);
              
              var tmp_key = window.sha256(fname +u.email);
              
              console.log("tmp_key",tmp_key);
              window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/newly_added_slide/'+ window.sha256(tmp_key)).set({
                
                imageId_for_thumb:imageId_for_thumb,
                imageId_for_origin:imageId_for_origin,
                audience_name: profile.getName(),
                audience_email: profile.getEmail(),
                profileUrl: profile.getImageUrl(),
                comment:msg,
                createdTime:ctime,
                fname:fname,
                kind:"Image",
                msg_present: window.sunny_slides_sheets.get_message_slide_for_history(),

               
              });

              //Email="+profile.getEmail()+"&Name="+profile.getName() +"&ProfileImage="+profile.getImageUrl()
              var incarved_data = {
                ctime:ctime,
                msg:msg,
                imageId_for_origin:imageId_for_origin,
                imageId_for_thumb:imageId_for_thumb,
                Email:profile.getEmail(),
                Name:profile.getName(),
                ProfileImage:profile.getImageUrl(),
                orginPresent:current_orignial_slides_id,
                thumbPresent:current_slides_id,
                kind:"Image"
              }

              callback(true);
              return;
              yestoslideAuto.prototype.add_email_to_sharedLink(imageId_for_origin,window.sunny.getCoordinatorEmail(),function(rst){
                console.log(rst);

                yestoslideAuto.prototype.add_email_to_sharedLink(imageId_for_thumb,window.sunny.getCoordinatorEmail(),function(rst){
                  console.log(rst);
                });
              });
              console.log("finished uploading image");
              window.sunny_modal.hide_spinner();
              return;
              yestoslideAuto.prototype.insertImageToNewSlides(imageId_for_origin,current_orignial_slides_id,incarved_data,function(slideId_origin_info){
                
                try{
                  if(slideId_origin_info.slideId =="error")
                  {
                    window.document.getElementById("sunny_spinner").classList.add("d-none");
                    window.document.getElementById("spinner_label").classList.add("d-none");
                    window.document.getElementById("spinner_label").innerHTML ="";
                    alert("uploading fail");
                    callback(false);

                    return;
                  }
                }
                catch(err)
                {
                  window.document.getElementById("sunny_spinner").classList.add("d-none");
                  window.document.getElementById("spinner_label").classList.add("d-none");
                  window.document.getElementById("spinner_label").innerHTML ="";
                  alert("uploading fail");
                  callback(false);

                  return;
                }
                
                window.document.getElementById("sunny_spinner").classList.remove("d-none");
                window.document.getElementById("spinner_label").classList.remove("d-none");

                var current_web_region = navigator.language;
                if(current_web_region.indexOf("ko") != -1)
                  window.document.getElementById("spinner_label").innerHTML ="<p>슬라이드 마무리 중..</p>";
                else              
                  window.document.getElementById("spinner_label").innerHTML ="<p>Uploading Slide</p>";
                
                console.log("original",slideId_origin_info.slideId);
                if(slideId_origin_info.slideId != "" || true)
                {
                  var slideId_for_origin = slideId_origin_info.slideId;
                  var origin_contentUrl = slideId_origin_info.contentUrl;
                  incarved_data.OriginID = slideId_for_origin;
                  yestoslideAuto.prototype.insertImageToNewSlides(imageId_for_thumb,current_slides_id,incarved_data,function(slideId_thumb_info){
                
                    try{
                      if(slideId_thumb_info.slideId =="error")
                      {
                        window.document.getElementById("sunny_spinner").classList.add("d-none");
                        window.document.getElementById("spinner_label").classList.add("d-none");
                        window.document.getElementById("spinner_label").innerHTML ="";
                        alert("uploading fail");
                        callback(false);
    
                        return;
                      }
                    }
                    catch(err)
                    {
                      window.document.getElementById("sunny_spinner").classList.add("d-none");
                      window.document.getElementById("spinner_label").classList.add("d-none");
                      window.document.getElementById("spinner_label").innerHTML ="";
                      alert("uploading fail");
                      callback(false);
    
                      return;
                    }
                   
                    console.log("thumb_slide_id",slideId_thumb_info.slideId);
                    if(slideId_thumb_info.slideId != "" || true)
                    {


                      var slideId_for_thumb = slideId_thumb_info.slideId;
                      var thumb_contentUrl = slideId_thumb_info.contentUrl;

                      if(slideId_for_thumb != "" && slideId_for_origin != "")
                      {
                        console.log("slideId_for_thumb:",slideId_for_thumb);
                        console.log("slideId_for_origin:",slideId_for_origin);
                        console.log("thumb_contentUrl:",thumb_contentUrl);
                        console.log("origin_contentUrl:",origin_contentUrl);
                        window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/newly_added_slide/'+ window.sha256(fname)).update({
                          slideId_for_thumb:slideId_for_thumb,
                          //slideId_for_thumb:"",
                          thumb_contentUrl: thumb_contentUrl,
                          slideId_for_origin:slideId_for_origin,
                          origin_contentUrl: origin_contentUrl,
                          msg_present: sunny_slides_sheets.get_message_slide_for_history()
                        });

                        yestoslideAuto.prototype.add_record_v2(ctime,slideId_for_thumb, current_slides_id, slideId_for_origin,current_orignial_slides_id,msg,imageId_for_origin,imageId_for_thumb,"Image");

                        sunny_slides_sheets.add_commment_to_personal_database_using_slides(msg,slideId_for_thumb,slideId_for_origin,function(rst){

                          console.log(rst);
                          callback(true);
                        });
  
                      }
                      else
                      {
                        console.log("could not get slideId");
                        console.log("slideId_for_thumb",slideId_for_thumb);
                        console.log("slideId_for_origin",slideId_for_origin);
                        window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/newly_added_slide/'+ window.sha256(fname)).update({
                          slideId_for_thumb:slideId_for_thumb,
                          slideId_for_origin:slideId_for_origin,
                          msg_present: sunny_slides_sheets.get_message_slide_for_history()
                          
                        });
                        callback(true);
                        
                      }
                    }
                    else
                    {
                      window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/newly_added_slide/'+ window.sha256(fname)).update({
                        slideId_for_thumb:"fail",
                        slideId_for_origin:"fail"
                        
                      });
                      alert("fail to create slide1");
                    }
                    try{
                      window.document.getElementById("sunny_spinner").classList.add("d-none");
                      window.document.getElementById("spinner_label").classList.add("d-none");
                      window.document.getElementById("spinner_label").innerHTML ="";
                    }
                    catch(err)
                    {

                    }
                    
                  })
                }
                
              })
              return;
            
             

            }
            else
            {
              var current_web_region = navigator.language;
              if(current_web_region.indexOf("ko") != -1)
                window.sunny_modal.show_alert_only("이미지 처리 실패,<br>다시 시도하세요",false,311,150,4);
              else              
                window.sunny_modal.show_alert_only("Fail to upload image,<br>Please try again",false,311,150,4);
              
                window.sunny_modal.hide_spinner();
                callback(false);
            }
          });
        }
        else
        {
          var current_web_region = navigator.language;
          if(current_web_region.indexOf("ko") != -1)
            window.sunny_modal.show_alert_only("이미지 처리 실패,<br>다시 시도하세요",false,311,150,4);
          else              
            window.sunny_modal.show_alert_only("Fail to upload image,<br>Please try again",false,311,150,4);

          window.sunny_modal.hide_spinner();  
          callback(false);
        }
      });


    };
    yestoslideAuto.prototype.update_sharing_images_info = function(imagesInSharing,fname,msg)
    {
      console.log(imagesInSharing);
      var imageId_for_origin = imagesInSharing.orgimg_in_sharing;
      var imageId_for_thumb = imagesInSharing.thumbimg_in_sharing
      var email_hash = window.sha256(coordinator_email);
      console.log("coordinator_email",coordinator_email);

      console.log("imageId_for_origin",imageId_for_origin);
      console.log("imageId_for_thumb",imageId_for_thumb);

      /*
      var user = window.gapi.auth2.getAuthInstance().currentUser.get();
      var profile = user.getBasicProfile();
      console.log('Full Name: ' + profile.getName());
      console.log('Given Name: ' + profile.getGivenName());
      console.log('Family Name: ' + profile.getFamilyName());
      console.log('Image URL: ' + profile.getImageUrl());
      console.log('Email: ' + profile.getEmail());
      */

      var d = new Date();
      var ctime = d.YYYYMMDDHHMMSS();
      var u = window.get_currentUser();
      var email_hash_me = window.sha256(u.email);
      
      var tmp_key = window.sha256(fname +u.email);
      
      console.log("tmp_key",tmp_key);
      console.log("email hash ",email_hash);
      console.log("imageId_for_thumb",imageId_for_thumb);
      if(window.sunny.is_original_slide_only())
      {
        imageId_for_thumb = imageId_for_origin;
      }
      console.log('thisisneverthat/current_slides/' + email_hash+ '/' +get_photoID_hash()+'/newly_added_slide/'+ window.sha256(tmp_key));

      var info = {
        imageId_for_thumb:imageId_for_thumb,
        imageId_for_origin:imageId_for_origin,
        audience_name: window.current_profile.name,
        audience_email: window.current_profile.email,
        profileUrl: window.current_profile.picture,
        comment:msg,
        createdTime:ctime,
        fname:fname,
        kind:"Image",
        msg_present: window.sunny_slides_sheets.get_message_slide_for_history(),
        incarved_data:imagesInSharing.incarved_data,
        contentUrl:imagesInSharing.contentUrl
      };

      
      console.log(info);
      window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/newly_added_slide/'+ window.sha256(tmp_key)).set(info);

      setTimeout(() => {
        try{
          window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/newly_added_slide/'+ window.sha256(tmp_key)).remove();
        }
        catch(err)
        {
          console.log(err.message);
        }
        
      }, 5000);

      //Email="+profile.getEmail()+"&Name="+profile.getName() +"&ProfileImage="+profile.getImageUrl()
      /*
      var incarved_data = {
        ctime:ctime,
        msg:msg,
        imageId_for_origin:imageId_for_origin,
        imageId_for_thumb:imageId_for_thumb,
        Email:profile.getEmail(),
        Name:profile.getName(),
        ProfileImage:profile.getImageUrl(),
        orginPresent:current_orignial_slides_id,
        thumbPresent:current_slides_id,
        kind:"Image"
      }
      */
    };
    yestoslideAuto.prototype.uploadToGD_cropped = function(imgId)
    {
        var imgsrc = document.getElementById(imgId).src;

        if(imgsrc.length <100)
        {
            alert("no image data to upload");
            return;
        }
        data_picture = imgsrc;
        
        yestoslideAuto.prototype.upload_to_gd();
    }
    yestoslideAuto.prototype.uploadToGD = function(imageId)
    {
      //"selfi_image"
      var imgsrc = window.document.getElementById(imageId).src;
    
      if(imgsrc.length <100)
      {
        alert("first load image");
        return;
      }
      data_picture = imgsrc;
      
      yestoslideAuto.prototype.upload_to_gd();
    };



    yestoslideAuto.prototype.upload_to_gd = function(msg="")
    {
        
    
            try
            {
              window.document.getElementById("sunny_spinner").classList.remove("d-none");
            }
            catch(err)
            {

            }
            
            //current_selfi_shared_folderid_v2 ="1q2t2LBhE6hYKeTS02-wLw3L2nwPQRqZZ";
            console.log("working_folder",working_folder);
            current_selfi_shared_folderid_v2 =working_folder;
            console.log("current_selfi_shared_folderid_v2",current_selfi_shared_folderid_v2);
        
            var d = yestoslideAuto.prototype.getTimestamp_selfi_controller();
            var fname = "yestoslide"+"-"+d+".png";
            var f = yestoslideAuto.prototype.dataURLtoFile_(data_picture,fname);
    
    
            //console.log(f);
            yestoslideAuto.prototype.run_(f,msg)	;
             
    };

    yestoslideAuto.prototype.run_video = function(obj)
    {
        is_image = false;
        perentage_upload =0;
        //var d = getTimestamp_selfi();
        //console.log(obj);
         const file = obj;
        //console.log("ddd");
        if(current_selfi_shared_folderid_v2 =="")
        {
            console.log("current_selfi_shared_folderid_v2",current_selfi_shared_folderid_v2);
            
            return;
        }
        
    
       // console.log(file);
      //const file = obj.target.files[0];
      //const file = obj;
      //console.log("file.name" ,file.name);
      var contentType = 'video/mp4';
      if (file.name != "") {

        newly_uploaded_fileName = file.name;
        let fr = new FileReader();
        fr.fileName = file.name;
        fr.fileSize = file.size;
        fr.fileType = contentType;
        fr.readAsArrayBuffer(file);
        fr.onload = yestoslideAuto.prototype.resumableUpload_;
      }
    }    

    var current_msg_to_add ="";
    yestoslideAuto.prototype.run_ = function(obj,msg) {
	
	
        
        current_msg_to_add = msg;
        is_image = true;
        perentage_upload =0;
        //var d = getTimestamp_selfi();
        //console.log(obj);
         const file = obj;
        //console.log("ddd");
        if(current_selfi_shared_folderid_v2 =="")
        {
            console.log("current_selfi_shared_folderid_v2",current_selfi_shared_folderid_v2);
            
            return;
        }
        
    
       //console.log(obj);
      //const file = obj.target.files[0];
      //const file = obj;
      //console.log("file.name", file.name);
      var contentType = 'image/PNG';
      if (file.name != "") {
        let fr = new FileReader();
        fr.fileName = file.name;
        fr.fileSize = file.size;
        fr.fileType = contentType;
        fr.readAsArrayBuffer(file);
        fr.onload = yestoslideAuto.prototype.resumableUpload_;
      }
    };
    yestoslideAuto.prototype.resumableUpload_ = function(e){


	
        //document.getElementById("progress").innerHTML = "Initializing.";
        const f = e.target;
        //console.log(e);
    
        //alert(f.fileType);
        
        var accessToken =window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;
        const resource = {
        fileName: f.fileName,
        fileSize: f.fileSize,
        fileType: f.fileType,
        fileBuffer: f.result,
        //folderId: current_selfi_shared_folderid_v2,
        folderId:current_selfi_shared_folderid_v2,
        accessToken: accessToken
        
        };
        
        console.log(resource);
        const ru = new window.ResumableUploadToGoogleDrive();
        ru.Do(resource, function(res, err) {
            if (err) {
    
              try{
                window.document.getElementById("sunny_spinner").classList.add("d-none");
              }
              catch(err)
              {

              }
                
                console.log(err);
                newly_uploaded_fileId = "";
                alert("faile to upload");
                return;
            
            }
            
            
            
            
            console.log(res.status);
            let msg = "";
            if (res.status == "Uploading") {
                msg =
                Math.round(
                    (res.progressNumber.current / res.progressNumber.end) * 100
                ) + "%";
                
                console.log("percentage",(res.progressNumber.current / res.progressNumber.end) * 100);
                
            } else {
                msg = res.status;
            }
            //document.getElementById("progress").innerText = msg;
            
            if(res.status =="Done")
            {
              try{
                window.document.getElementById("sunny_spinner").classList.add("d-none");
              }
              catch(err)
              {

              }
                
                console.log(res.result.id);
                console.log(res.result);
                
                newly_uploaded_fileId = res.result.id;

                /*수정해야함*/

                //alert(coordinateEmail);
                yestoslideAuto.prototype.add_email_to_sharedLink(newly_uploaded_fileId,"yestoslide@gmail.com",function(rst){
                //yestoslideAuto.prototype.make_anyone_reader(newly_uploaded_fileId,function(rst){
                    //add_email_to_sharedLink(newly_uploaded_fileId,"yestoslide@gmail.com",function(rst){
                    //	console.log("shared by yestoslide@gmail.com");
    
                    //});
                    if(rst)
                    {
                        if(is_image)
                            yestoslideAuto.prototype.sendImageLink(current_msg_to_add);
                        else
                        {

                          yestoslideAuto.prototype.make_anyone_reader(newly_uploaded_fileId,function(rst){
                            window.sunny_slides_sheets.update_newly_added_slide(current_msg_to_add,newly_uploaded_fileId,newly_uploaded_fileName);
                            //yestoslideAuto.prototype.sendVideoLink(current_msg_to_add);	
                          });
                        }
                            
    
                        //alert("upload done");
                    }
                    
                    
                })
                
            }
        });
    };

    yestoslideAuto.prototype.sendVideoLink = function(msg)
    {
      

      
      //newly_uploaded_fileId = "1HbfvhzjJRYMe_xdVsBdkvY6Cm3_GngRG";
      if(newly_uploaded_fileId =="")
      {
        alert("first upload video to google drive");
        return;
      }
      //https://stackoverflow.com/questions/56502086/google-app-script-web-app-get-and-post-request-blocked-by-cors-policy
      //https://tanaikech.github.io/2017/02/05/file-upload-using-dopost-on-google-web-apps/

      //https://drive.google.com/file/d/1HbfvhzjJRYMe_xdVsBdkvY6Cm3_GngRG/view?usp=sharing  //video
      //https://docs.google.com/presentation/d/1fkHl6bYAn-dNVgh15J9N6b-0gf0rCv2_K1Oec6abX10/edit?usp=sharing //deck

      var url = apps_script_link_lecture;
      console.log(url);
      var user = window.gapi.auth2.getAuthInstance().currentUser.get();
      var profile = user.getBasicProfile();
      var http = new XMLHttpRequest();

      var d = new Date();
      var ctime = d.YYYYMMDDHHMMSS();
      var data = {
        "ctime":ctime,
        "msg":msg,
        //"imageId_for_origin":"1GAXFtKExAbVFdANMSYwQnGjdApviuRg4",
        //"imageId_for_thumb":"1719DSjl-QMk67g6GvsQNvWUHF-jfOswo",
        "Email":profile.getEmail(),
        "Name":profile.getName(),
        "ProfileImage":profile.getImageUrl(),
        "orginPresent":current_orignial_slides_id,
        "thumbPresent":current_slides_id,
        "kind":"Video",
        "msg_present":"1k-7gOQhhHAsRZQlPr9ofbRIuMqM9KCIFu3VOf9fHrsA",
        //"image_key":"6ebf6b437424b1eeae64a23b02ab4286651f7626742a8a90d6035b8ea72d435c",
        //"old_imageId_for_origin":"1noFBrDT3l_diyhGTZUvxfk8-HJHcZqLX",
        //"old_imageId_for_thumb":"1jl38Vo4St4L-9aBAI0YHlP7pltGw73Rg",
        //"ID":"SLIDES_API449695211_0"
        };

      data = JSON.stringify(data); 

      console.log(data);
      var msg = encodeURIComponent(data);
      
      var params = "videoLink="+newly_uploaded_fileId+"&deckId="+current_slides_id+"&org_deckId="+current_orignial_slides_id+"&comment="+msg;
      console.log(params);

      http.open("POST", url, true);

      //Send the proper header information along with the request
      http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

      //Call a function when the state changes.
      http.onreadystatechange = function() {
          if (http.readyState==4) {
          //alert the user that a response now exists in the responseTest property.
          console.log(http.responseText);
          

          if(http.responseText.indexOf("error:") != -1)
          {
            alert("error to insert image");
          }
          else
          {
            //sunny_slides_sheets.add_record(http.responseText, current_slides_id,"","Video");
            
          }

          newly_uploaded_fileId = "";
          // And to view in firebug
          //  console.log('xhr',xmlhttp)
          }
      } // end callback

      http.send(params);
    };

    yestoslideAuto.prototype.sendImageLink_v2 = function(msg,fileId,presentId,callback)
    {

      if(fileId =="")
      {
        alert("first upload image to google drive");
        return;
      }
      //https://stackoverflow.com/questions/56502086/google-app-script-web-app-get-and-post-request-blocked-by-cors-policy
      //https://tanaikech.github.io/2017/02/05/file-upload-using-dopost-on-google-web-apps/

      //https://drive.google.com/file/d/1yihaEd2l7OeDeZ-uJKdnee0Sl3ulL-3u/view?usp=sharing
      //https://docs.google.com/presentation/d/1fkHl6bYAn-dNVgh15J9N6b-0gf0rCv2_K1Oec6abX10/edit?usp=sharing
      var url = apps_script_link_lecture_by_anyone;
      console.log(url);
      var http = new XMLHttpRequest();

      var params = "imgLink="+fileId+"&deckId="+presentId;
      console.log(params);

      http.open("POST", url, true);

      //Send the proper header information along with the request
      http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

      //Call a function when the state changes.
      http.onreadystatechange = function() {
          if (http.readyState==4) {
          //alert the user that a response now exists in the responseTest property.
          console.log("created slideID: ",http.responseText);

          if(http.responseText.indexOf("error:") != -1)
          {
            alert("error to insert image in sendImageLink_v2");
            callback("");
          }
          else
          {
                 
            
            callback(http.responseText);
            
          }
          
          newly_uploaded_fileId = "";
          // And to view in firebug
          //  console.log('xhr',xmlhttp)
          }
      } // end callback

      http.send(params);

    };
    yestoslideAuto.prototype.sendImageLink = function(msg)
    {

      if(newly_uploaded_fileId =="")
      {
        alert("first upload image to google drive");
        return;
      }
      //https://stackoverflow.com/questions/56502086/google-app-script-web-app-get-and-post-request-blocked-by-cors-policy
      //https://tanaikech.github.io/2017/02/05/file-upload-using-dopost-on-google-web-apps/

      //https://drive.google.com/file/d/1yihaEd2l7OeDeZ-uJKdnee0Sl3ulL-3u/view?usp=sharing
      //https://docs.google.com/presentation/d/1fkHl6bYAn-dNVgh15J9N6b-0gf0rCv2_K1Oec6abX10/edit?usp=sharing
      var url = apps_script_link_lecture_by_anyone;
      console.log(url);
      var http = new XMLHttpRequest();

      var params = "imgLink="+newly_uploaded_fileId+"&deckId="+current_slides_id;
      console.log(params);

      http.open("POST", url, true);

      //Send the proper header information along with the request
      http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

      //Call a function when the state changes.
      http.onreadystatechange = function() {
          if (http.readyState==4) {
          //alert the user that a response now exists in the responseTest property.
          console.log("created slideID: ",http.responseText);

          if(http.responseText.indexOf("error:") != -1)
          {
            alert("error to insert image");
          }
          else
          {
                 
            
            sunny_slides_sheets.add_record(http.responseText, current_slides_id ,msg,"Image");
            current_msg_to_add = "";
          }
          
          newly_uploaded_fileId = "";
          // And to view in firebug
          //  console.log('xhr',xmlhttp)
          }
      } // end callback

      http.send(params);

    };

    yestoslideAuto.prototype.sendImageLink_with_background = function(imgId, bgId,msg,callback)
    {

      if(newly_uploaded_fileId =="")
      {
        alert("first upload image to google drive");
        return;
      }
      //https://stackoverflow.com/questions/56502086/google-app-script-web-app-get-and-post-request-blocked-by-cors-policy
      //https://tanaikech.github.io/2017/02/05/file-upload-using-dopost-on-google-web-apps/

      //https://drive.google.com/file/d/1yihaEd2l7OeDeZ-uJKdnee0Sl3ulL-3u/view?usp=sharing
      //https://docs.google.com/presentation/d/1fkHl6bYAn-dNVgh15J9N6b-0gf0rCv2_K1Oec6abX10/edit?usp=sharing
      var url = apps_script_link_lecture_by_anyone;
      console.log(url);
      var http = new XMLHttpRequest();

      var params = "imgLink_with_bg="+imgId+"&bgId="+bgId+"&deckId="+current_slides_id;
      console.log(params);
      
      http.open("POST", url, true);

      //Send the proper header information along with the request
      http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

      //Call a function when the state changes.
      http.onreadystatechange = function() {
          if (http.readyState==4) {
          //alert the user that a response now exists in the responseTest property.
          console.log("created slideID: ",http.responseText);

          newly_uploaded_fileId = "";
          if(http.responseText.indexOf("error:") != -1)
          {
            
            callback(false);
          }
          else
          {
                 
            
            sunny_slides_sheets.add_record(http.responseText, current_slides_id ,msg,"Image");
            current_msg_to_add = "";
            callback(true);

          }
          
          
          // And to view in firebug
          //  console.log('xhr',xmlhttp)
          }
      } // end callback

      http.send(params);

    };


    // array.sort(dynamicSort("-send_time"));
    yestoslideAuto.prototype.dynamicSort =function(property){
      var sortOrder = 1;
      if(property[0] === "-") {
          sortOrder = -1;
          property = property.substr(1);
      }
      return function (a,b) {
          /* next line works with strings and numbers, 
          * and you may want to customize it to your needs
          */
          var result = result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
         
          return result * sortOrder;
      }
    }
    yestoslideAuto.prototype.dataURLtoFile_ = function(dataurl, filename) {
        //console.log(dataurl);
        try
        {
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
         bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
         while(n--){
             u8arr[n] = bstr.charCodeAt(n);
         }
         
         return new File([u8arr], filename, {type:mime});
       }
       catch(err)
       {
               console.log(err.message);
    
               alert("error occurred, wil restart!");
               //location.reload(false);		  
       }
             
    }   
    
    yestoslideAuto.prototype.change_auto_mode =function(mode)
    {
      var u = window.get_currentUser();
      var email_hash = window.sha256(u.email);
      window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/auto_mode/').update({
        mode:mode
      });

    }
    yestoslideAuto.prototype.get_auto_mode =function(callback)
    {
      var u = window.get_currentUser();
      var email_hash = window.sha256(u.email);
      firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/auto_mode/').once("value", function(snapshot){
          
          //console.log("from sunny",snapshot.val());
          
          if(snapshot.val() == null)
          {
            callback(true);
            return;
          }
          
          var mode  = snapshot.val();
          console.log(mode);
          callback(snapshot.val().mode);
      });

    }


    var enabled_for_collecting_info =false;
    yestoslideAuto.prototype.waiting_for_collecting_info_from_controller = function()
    {
     
      if(enabled_for_collecting_info)
      {
     

        return;
      }
     
      enabled_for_collecting_info = true;

      var u = window.get_currentUser();
      var email_hash = window.sha256(u.email);
      
      
      var ref = window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/collecting/');    
		  ref.on("child_added", function(snapshot){
        

        console.log("collecting info added",snapshot.val());
         
        
        if(snapshot.val() != null) 
        {
          if(snapshot.val().collecting_started)
          {
            main_iframe.update_collecting_btn(snapshot.val().collecting_started);
          }
          else
          {
            main_iframe.update_collecting_btn(snapshot.val().collecting_started);
          }
        }
        else
        {
          main_iframe.update_collecting_btn(false);
        }

		  });
      ref.on("child_changed", function(snapshot){
        console.log("collecting info changed",snapshot.val());
        console.log(snapshot.val());
        //main_iframe.update_collecting_btn(snapshot.val().collecting_started);

        if(snapshot.val().collecting_started)
        {
          try{
            window.document.getElementById("sunny_spinner").classList.remove("d-none");
            window.document.getElementById("spinner_label").innerHTML ="<p>creating new presentation...</p>";
          }
          catch(err)
          {

          }
          setTimeout(() => {
            location.reload();		    
          }, 10000);
          
        }
        else
        {
          main_iframe.update_collecting_btn(snapshot.val().collecting_started);
        }
          
     	 
		  });
    }

 
    yestoslideAuto.prototype.control_incarved_data = function(incarved_data,contentUrl)
    {
      console.log("control_incarved_data");
      console.log(incarved_data);
      var data = JSON.parse(incarved_data);
      
      data.contentUrl = contentUrl;
      console.log(data);
      window.sunny_images.original_presents_slides[data.imageId_for_origin] = data;
    }
    yestoslideAuto.prototype.wating_for_newly_added_slide = function()
    {
      if(enabled_for_newly_added_slide)
      {
        var u = window.get_currentUser();
        var email_hash = window.sha256(u.email);

        //살려내
        window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/newly_added_slide/').remove();
        return;
      }

     
      enabled_for_newly_added_slide = true;

      var u = window.get_currentUser();
      var email_hash = window.sha256(u.email);


      if(!this.is_controller())
      {
        window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/auto_mode/').update({
          mode:false
        });

      }

      //살려내
      if(!window.sunny.is_controller())
        window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/newly_added_slide/').remove(); 
      
      console.log("i am controller");
      var ref = window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/newly_added_slide/');    
		  ref.on("child_added", function(snapshot){
			 
        console.log("get_stopped_collecting",yestoslideAuto.prototype.get_stopped_collecting());
        if(yestoslideAuto.prototype.get_stopped_collecting())
          return;
        console.log(snapshot.val());



        if(false)
        {
          console.log(window.sunny_slides_sheets.get_problem_snapsht());
          window.sunny_slides_sheets.get_problem_snapsht().unshift(snapshot);
          if(window.sunny_slides_sheets.timer_for_problem_snapshot ==null)
          {
            window.sunny_slides_sheets.timer_for_problem_snapshot = setInterval(sunny_slides_sheets.do_problem_snapshot,3000);
  
          }
        }
        
        
        window.sunny.set_previous_displayed_image("");


        var incarved_data = snapshot.val().incarved_data;
        var contentUrl = snapshot.val().contentUrl;
        //window.sunny.control_incarved_data(incarved_data,contentUrl);

        console.log(incarved_data);
        var data = JSON.parse(incarved_data);
        console.log(data);
        data.contentUrl = contentUrl;
        data.origin_contentUrl = contentUrl.replace(window.sunny_images.get_thumbnail_postfix(),"");
        window.sunny_images.original_presents_slides[data.imageId_for_thumb] = data;

        
        var sInfo = {
        slideUrl:"",
        title: "",
        name: "",
        category: snapshot.val().kind,
        date: "2021-07-07",
        slideId:""
        }
        var url = "https://docs.google.com/presentation/d/"+sunny.get_current_presentationID()+"/preview?rm=minimal&slide=id."+data.OriginID;
                
        sInfo["slideUrl"] = url;
        sInfo["slideId"] = data.OriginID;
        sInfo["slideId_origin"] = data.OriginID;
               
       
        {
          sInfo["name"] = snapshot.val().audience_name;
          sInfo["title"] = snapshot.val().comment;
          sInfo["CreateTime"] = snapshot.val().createdTime;
          //if(((snapshot.val().imageId_for_thumb).toLowerCase()).indexOf("http") != -1)
          if(((contentUrl).toLowerCase()).indexOf("http") != -1)
          {
            sInfo["thumb_contentUrl"] =contentUrl;//snapshot.val().imageId_for_thumb;
            sInfo["thumbImgUrl"] =  contentUrl;//snapshot.val().imageId_for_thumb;
            sInfo["orgImgUrl"] =  data.imageId_for_origin;
            sInfo["thumbImgUrl_only"] = data.imageId_for_thumb;
          }
          else
          {
            sInfo["thumb_contentUrl"] ="https://drive.google.com/uc?&id="+snapshot.val().imageId_for_thumb;
            sInfo["thumbImgUrl"] =  "https://drive.google.com/uc?&id="+snapshot.val().imageId_for_thumb;
            sInfo["orgImgUrl"] = "https://drive.google.com/uc?&id="+ snapshot.val().imageId_for_origin;
            sInfo["thumbImgUrl_only"] =  "https://drive.google.com/uc?&id="+ snapshot.val().imageId_for_origin;
          }
          
          
          sInfo["ProfileImage"] = snapshot.val().profileUrl;
        }
        
        
        console.log(sInfo);

        

        
        main_iframe.document.getElementById("img_collection").contentWindow.add_a_slide_to_ul(sInfo,true);
        console.log(main_iframe.document.getElementById("img_collection").contentWindow.slide_info);
        //main_iframe.document.getElementById("img_collection").contentWindow.setImage();
        console.log("do_after_adding_all_images",666);
        main_iframe.document.getElementById("img_collection").contentWindow.do_after_adding_all_images();


        //
        
        var incarved_data = {
          ctime:snapshot.val().createdTime,
          msg:snapshot.val().comment,
          imageId_for_origin:snapshot.val().imageId_for_origin,
          imageId_for_thumb:snapshot.val().imageId_for_thumb,
          Email:snapshot.val().audience_email,
          Name:snapshot.val().audience_name,
          ProfileImage:snapshot.val().profileUrl,
          orginPresent:"",
          thumbPresent:"",
          kind:snapshot.val().kind,
          msg_present: snapshot.val().msg_present,
          image_key:snapshot.key
        }

        //console.log(incarved_data);
        //console.log(window.sunny_slides_sheets.get_message_slide_for_history());
        //window.sunny_slides_sheets.push_newly_added_images(incarved_data);
        window.sunny_slides_sheets.push_newly_added_images_v2(incarved_data);

        return;
        add_newly_added_slide_to_image_list(snapshot.val().slideId);
			  
			 
		  });
      
     
    };

    yestoslideAuto.prototype.getBase64Image = function(imgUrl, callback) {

      var img = new Image();
  
      // onload fires when the image is fully loadded, and has width and height
  
      img.onload = function(){
  
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL("image/png"),
            dataURL = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  
        callback(dataURL); // the base64 string
  
      };
  
      // set attributes and src 
      img.setAttribute('crossOrigin', 'anonymous'); //
      img.src = imgUrl;
  
  }
    yestoslideAuto.prototype.gen_images = function (img_base64,name,msg,callback)
    {

      var user = window.gapi.auth2.getAuthInstance().currentUser.get();
      var profile = user.getBasicProfile();
      console.log('Image URL: ' + profile.getImageUrl());
      console.log(msg);
      console.log(name);

      yestoslideAuto.prototype.getBase64Image(profile.getImageUrl(),function(imgData){
        console.log(imgData);

        let pres = new PptxGenJS();

        pres.layout = "LAYOUT_WIDE";

        //100 px = 1 inch
        if(name.indexOf("_original") != -1)
        {
          pres.defineSlideMaster({
            title: "MASTER_SLIDE",
            background: { color: "FFFFFF" },
            objects: [
              
                { image: { x: 0, y: 0, w: "100%", h: "100%", data: img_base64 } },
                { image: {x:"25%", y: "2%", w: "50%", h: "8%", fill:{ transparency:90 }, align:"center", type:"contain", path: '/main/chatbox_background.svg' } },
                { image: {x:"27%", y: "3.5%", w: 0.34, h: 0.34, fill:{ transparency:90 }, align:"left",rounding:true, type:"contain", data: "data:image/png;base64,"+imgData } },
                { text: { text: msg, options: { x: 0, y: "2%",  w: "100%", h:"8%" , align: "center",color: "ffffff" ,bold: true,fontSize: 12} } }
            ]
          });  
        }
        else
        {
          pres.defineSlideMaster({
            title: "MASTER_SLIDE",
            background: { color: "FFFFFF" },
            objects: [
              
                { image: { x: 0, y: 0, w: "100%", h: "100%", data: img_base64 } }
            
            ]
          });
        }
        
        if(name.indexOf("_original") != -1)
          pres.addSlide({ masterName: "MASTER_SLIDE" });
        else
        {
          let slide = pres.addSlide();
          slide.addImage({x: 0, y: 0, w: "100%", h: "100%", data: img_base64 });
        }

        //slide.addText("How To Create PowerPoint Presentations with JavaScript", { x: 0.5, y: 0.7, fontSize: 18 });

        // 2. Add a Slide
        //let slide = pres.addSlide();

        // 3. Add one or more objects (Tables, Shapes, Images, Text and Media) to the Slide
        //https://drive.google.com/file/d/1-zzA2b8sAOy1NMwtaFMLOcY11opibsab/view?usp=sharing
        //slide.addImage({ path: "https://drive.google.com/uc?&id=1-zzA2b8sAOy1NMwtaFMLOcY11opibsab" });

        // Image by local URL
        //slide.addImage({ path: "images/chart_world_peace_near.png" });

        // Image by 
        //slide.addImage({ x: 1.0, y: 1.1, w: 1.5, h: 1.5, path: IMAGE_PATHS.gifAnimTrippy.path });data (pre-encoded base64)
        //slide.addImage({x: 0, y: 0, w: "100%", h: "100%", data: img_base64 });
        if(name.indexOf("_original") != -1)
        {
          
          /*
          slide.addImage({x:"20%", y: 0, w: "60%", h: "10%", fill:{ transparency:90 }, align:"center", type:"contain", path: '/main/chatbox_background.png' });
          slide.addText(msg, { x: 0, y: 0,  w: "100%", h:"10%" , align: "center",color: "ffffff" });
          */
          
        }
      

        // 4. Save the Presentation
        //pres.writeFile();

        //application/vnd.openxmlformats-officedocument.presentationml.presentation

        pres.write("blob")
          .then((data) => {
            
              //console.log("write as base64: Here are 0-100 chars of `data`:\n");
              //console.log(data);
              //saveAs(data, 'mypng.pptx');
              yestoslideAuto.prototype.upload_pptx_toGD(data,name,function(rst){
                console.log("upload pptx", rst);
                callback(rst);
              });
          })
          .catch((err) => {
              console.error(err);
              callback("")
          });

      })
      
    }

    yestoslideAuto.prototype.upload_pptx_toGD = function(blob,cur_name,callback)
    {
        //https://script.google.com/macros/s/AKfycbx2YfOamEbXo-uE6luxPcbumB5r97A6oCmJ1ENiz6WqzONS-GNjtbVSuFp8_HkLkHhb/exec
        
      current_selfi_shared_folderid_v2 =working_folder;
  
      
      var d = yestoslideAuto.prototype.getTimestamp_selfi_controller();
      var fname = "teacher"+"-"+d+".pptx";
      var file = blob;
      file.lastModifiedDate = new Date();
      file.name = "sunny.pptx";
      console.log(cur_name);

      console.log(file);

      perentage_upload =0;
    
    
      var contentType = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
      if (file.name != "") {
        let fr = new FileReader();
        fr.fileName = file.name;
        fr.fileSize = file.size;
        fr.fileType = contentType;
        fr.readAsArrayBuffer(file);
        fr.onload = function(e){
          //document.getElementById("progress").innerHTML = "Initializing.";
          const f = e.target;
          //console.log(e);
      
          //alert(f.fileType);
          
          var accessToken =window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;
          const resource = {
          fileName: f.fileName,
          fileSize: f.fileSize,
          fileType: f.fileType,
          fileBuffer: f.result,
          //folderId: current_selfi_shared_folderid_v2,
          folderId:current_selfi_shared_folderid_v2,
          convertToGoogleDocs:true,
          accessToken: accessToken
          
          };
          
          console.log(resource);
          const ru = new window.ResumableUploadToGoogleDrive();
          ru.Do(resource, function(res, err) {
              if (err) {
      
                  console.log(err);
                  
                  alert("faile to upload");
                  callback("");
                  return;
              
              }
              
              
              
              
              console.log(res.status);
              let msg = "";
              if (res.status == "Uploading") {
                  msg =
                  Math.round(
                      (res.progressNumber.current / res.progressNumber.end) * 100
                  ) + "%";
                  
                  console.log("percentage",(res.progressNumber.current / res.progressNumber.end) * 100);
                  
              } else {
                  msg = res.status;
              }
              //document.getElementById("progress").innerText = msg;
              
              if(res.status =="Done")
              {
                console.log(res);
                console.log("upload done");

                yestoslideAuto.prototype.add_email_to_sharedLink(res.result.id,"yestoslide@gmail.com",function(rst){

                  var continue_while = true;
                    var while_cnt = 0;
                    while(continue_while && false)
                    {

                      while_cnt ++;
                      if(while_cnt >3000)
                      {
                        continue_while = false;
                      }
                    }
                    console.log("org");
                  //https://docs.google.com/presentation/d/1tGC94E5IZb4QoeIFqdr4hYheksGx37I7gzrofgnMLd0/edit?usp=sharing origonal
                  //https://docs.google.com/presentation/d/1Jv7ZxvvKo_YmF3dvrfXpny9Axp6__P5jKgbd9lDH0OU/edit?usp=sharing thumnail
                  if(cur_name.indexOf("_original") != -1)
                  {
                    
                    yestoslideAuto.prototype.merge_slides(current_orignial_slides_id,res.result.id,function(each_slide_id){
                      console.log("original slide id ",each_slide_id);

                      //yestoslideAuto.prototype.delete_a_File(res.result.id);
                      callback(each_slide_id);

                     
                    });

                  }
                  else
                  {
                    var continue_while = true;
                    var while_cnt = 0;
                    while(continue_while && false)
                    {

                      while_cnt ++;
                      if(while_cnt >3000)
                      {
                        continue_while = false;
                      }
                    }
                    console.log("thumb");
                    yestoslideAuto.prototype.merge_slides(current_slides_id,res.result.id,function(each_slide_id){
                      console.log("thumb slide id ",each_slide_id);
                      console.log(each_slide_id);
                      //yestoslideAuto.prototype.delete_a_File(res.result.id);
                      callback(each_slide_id);
                    });
                  }

                });
                /*
                var body = {'title': cur_name};
                var request = gapi.client.drive.files.patch({
                  'fileId':  res.result.id,
                  'resource': body
                });
                request.execute(function(resp) {
                  console.log('New Title: ' + resp.title);
                
                });
                */

                
              }
          });

        };
      }
    };

    yestoslideAuto.prototype.delete_a_File = function(file_id,callback) {
     
      console.log(file_id);
      var request = window.gapi.client.drive.files.delete({
          
          fileId: file_id
      });
      request.execute(function(resp) {
        console.log(resp);
        callback(true);
        
      });

    };
    yestoslideAuto.prototype.merge_slides = function(mainDeckId,tempDeckId,callback)
    {
      //https://docs.google.com/spreadsheets/d/15ObU-T8AOoxsecbc2RtTDoo8KVlUmv5WwIw1NWe0wZ0/edit?usp=sharing
      //var current_header = "ID,CreateTime,Comment";
          
          
          var url = apps_script_link_for_presentation;
          console.log(url);
              
          var http = new XMLHttpRequest();
   
       
          //e.parameters.merge_slides)
          //e.parameters.mainDeckId.toString();
          //e.parameters.tempDeckId.toString();

          //e.parameters.create_slides_by_yestoslide,e.parameters.parentId, e.parameters.coordinatorEmail
          var params = "merge_slides_v2=merge_slides"+"&mainDeckId="+mainDeckId +"&tempDeckId="+tempDeckId;

          console.log(params);
          http.open("POST", url, true);
          
  
          //Send the proper header information along with the request
          http.setRequestHeader("Content-type", "application/x-www-form-urlencoded;");
  
          //Call a function when the state changes.
          http.onreadystatechange = function() {
              if (http.readyState==4) {
              
                callback(http.responseText);

                
               
              
              }
          } // end callback
  
          http.send(params);
    };

    
    yestoslideAuto.prototype.copy_blobs_to_sharing_folder_and_add_to_deck = function(b64,b64_thumb,fname,deckId,deckId_thumb,callback)
    {

      //main_apps_presentation

      var url = apps_script_link_for_presentation;
      
      console.log(url);
      //var url = "https://script.google.com/macros/s/AKfycbydUxUavNRdxXxqAl3jeKicFHTh1Zpz7LibMX-nLcPPSoGrLC-Om70fEeJSyFMgU-Vs/exec";

      var http = new XMLHttpRequest();

      var u = window.get_currentUser();
      
      //console.log(window.sunny.get_current_sharing_folder());
      
      var b64_obj = {
        b64: b64,
        b64_thumb:b64_thumb
      }
      

      var b64_obj_str = JSON.stringify(b64_obj);
      

      
      //console.log(b64_obj_str);
      b64_obj_str = encodeURIComponent(b64_obj_str);
      
      
      fname = encodeURIComponent(fname);
      //console.log(fname);
      console.log(window.sunny.get_current_sharing_folder());
      //var params = "imgLink="+fileId+"&deckId="+presentId+"&data="+data;
      //var params = "imgLink_with_contentUrl="+fileId+"&deckId="+presentId+"&data="+data;
      var params = "copy_blobs_to_sharing_folder_and_add_to_deck=xxx"+"&fname="+fname+"&deckId="+deckId+"&deckId_thumb="+deckId_thumb+"&sharing_folder_id="+window.sunny.get_current_sharing_folder()+"&b64_obj_str="+b64_obj_str;
            
      //console.log(params);
      
      

      http.open("POST", url, true);

      //Send the proper header information along with the request
      http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

      //Call a function when the state changes.
      http.onreadystatechange = function() {
          if (http.readyState==4) {
          //alert the user that a response now exists in the responseTest property.
          //console.log("created slideID: ",http.responseText);

          //console.log(http.responseText);
          if(http.responseText.indexOf("error:") != -1)
          {
            //alert(http.responseText);
            var info = {
              imgId : "",
              slideId:"",
              imgId_thumb: "",
              slideId_thumb:""
            }
            callback(info);
          }
          else if(http.responseText =="")
          {
            var info = {
              imgId : "",
              slideId:"",
              imgId_thumb: "",
              slideId_thumb:""
            }
            callback(info);
          }
          else
          {
                  
            //console.log(http.responseText);
            //console.log(JSON.parse(http.responseText));
            
            callback(JSON.parse(http.responseText));
            
          }
          
          newly_uploaded_fileId = "";
          
          }
      } // end callback

      http.send(params);

    };
    yestoslideAuto.prototype.copy_one_blob_to_sharing_folder_and_add_to_deck = function(b64,fname,is_org,deckId,callback)
    {

      //main_apps_presentation

      var url = apps_script_link_for_presentation;
      console.log(url);
      if(!is_org)
      {
        url = apps_script_link_for_presentation_thumb;
        console.log("for thumb ",url);
        if(window.sunny.is_original_slide_only())
        {
          var info = {
            imgId : "original_slide_only",
            slideId:"original_slide_only"
          }
          callback(info);
          return;
        }
      }
      else
      {
        console.log("for org ",url);
      }
      
      //var url = "https://script.google.com/macros/s/AKfycbydUxUavNRdxXxqAl3jeKicFHTh1Zpz7LibMX-nLcPPSoGrLC-Om70fEeJSyFMgU-Vs/exec";

      var http = new XMLHttpRequest();

      var u = window.get_currentUser();
      
      //console.log(window.sunny.get_current_sharing_folder());
      
      var b64_obj = {
        b64: b64
      }
      

      var b64_obj_str = JSON.stringify(b64_obj);
      

      
      //console.log(b64_obj_str);
      b64_obj_str = encodeURIComponent(b64_obj_str);
     
      
      fname = encodeURIComponent(fname);
      //console.log(fname);
      console.log(window.sunny.get_current_sharing_folder());
      //var params = "imgLink="+fileId+"&deckId="+presentId+"&data="+data;
      //var params = "imgLink_with_contentUrl="+fileId+"&deckId="+presentId+"&data="+data;
      var params = "copy_one_blob_to_sharing_folder_and_add_to_deck=xxx"+"&fname="+fname+"&deckId="+deckId+"&sharing_folder_id="+window.sunny.get_current_sharing_folder()+"&b64_obj_str="+b64_obj_str;
           
      //console.log(params);
      
     

      http.open("POST", url, true);

      //Send the proper header information along with the request
      http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

      //Call a function when the state changes.
      http.onreadystatechange = function() {
          if (http.readyState==4) {
          //alert the user that a response now exists in the responseTest property.
          //console.log("created slideID: ",http.responseText);

          //console.log(http.responseText);
          if(http.responseText.indexOf("error:") != -1)
          {
            //alert(http.responseText);
            var info = {
              imgId : "",
              slideId:""
            }
            callback(info);
          }
          else if(http.responseText =="")
          {
            var info = {
              imgId : "",
              slideId:""
            }
            callback(info);
          }
          else
          {
                 
            //console.log(http.responseText);
            //console.log(JSON.parse(http.responseText));
            
            callback(JSON.parse(http.responseText));
            
          }
          
          newly_uploaded_fileId = "";
          
          }
      } // end callback

      http.send(params);

    };

    yestoslideAuto.prototype.add_to_deck_using_imageFileId = function(imageId,fname,is_org,deckId,callback)
    {

      //main_apps_presentation

      var url = apps_script_link_for_presentation;
      url = url;
      console.log(url);
      if(!is_org)
      {
        url = apps_script_link_for_presentation_thumb;
        console.log("for thumb ",url);
        if(window.sunny.is_original_slide_only())
        {
          var info = {
            imgId : "original_slide_only",
            slideId:"original_slide_only"
          }
          callback(info);
          return;
        }
      }
      else
      {
        console.log("for org ",url);
      }
      
      //var url = "https://script.google.com/macros/s/AKfycbydUxUavNRdxXxqAl3jeKicFHTh1Zpz7LibMX-nLcPPSoGrLC-Om70fEeJSyFMgU-Vs/exec";

      var http = new XMLHttpRequest();

      var u = window.get_currentUser();
      
      //console.log(window.sunny.get_current_sharing_folder());
      
      
      imageId = encodeURIComponent(imageId);
      fname = encodeURIComponent(fname);
      //console.log(fname);
      console.log(window.sunny.get_current_sharing_folder());
      
      //var params = "copy_one_blob_to_sharing_folder_and_add_to_deck=xxx"+"&fname="+fname+"&deckId="+deckId+"&sharing_folder_id="+window.sunny.get_current_sharing_folder()+"&b64_obj_str="+b64_obj_str;
      var params = "add_to_deck_using_imageFileId=xxx"+"&fname="+fname+"&deckId="+deckId+"&sharing_folder_id="+window.sunny.get_current_sharing_folder()+"&imageId="+imageId;
           
      console.log(params);
      
     

      http.open("POST", url, true);

      //Send the proper header information along with the request
      http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

      //Call a function when the state changes.
      http.onreadystatechange = function() {
          if (http.readyState==4) {
          //alert the user that a response now exists in the responseTest property.
          //console.log("created slideID: ",http.responseText);

          console.log(http.responseText);
          if(http.responseText.indexOf("error:") != -1)
          {
            try{
              var info = JSON.parse(http.responseText);
              callback(info);

            }
            catch(err)
            {
              var info = {
                imgId : "",
                slideId:""
              }
              callback(info);
            }
            //alert(http.responseText);
            
          }
          else if(http.responseText =="")
          {
            var info = {
              error:"empty",
              imgId : "",
              slideId:""
            }
            callback(info);
          }
          else
          {
                 
            //console.log(http.responseText);
            console.log(JSON.parse(http.responseText));
            
            callback(JSON.parse(http.responseText));
            
          }
          
          newly_uploaded_fileId = "";
          
          }
      } // end callback

      http.send(params);

    };

    yestoslideAuto.prototype.copy_one_blob_to_sharing_folder = function(b64,fname,is_org,callback)
    {

      //main_apps_presentation

      var url = apps_script_link_for_presentation;
      console.log(url);
      if(!is_org)
      {
        url = apps_script_link_for_presentation_thumb;
        console.log("for thumb ",url);
        if(window.sunny.is_original_slide_only())
        {
          var info = {
            imgId : "original_slide_only",
          }
          callback(info);
          return;
        }
      }
      else
      {
        console.log("for org ",url);
      }
      
      //var url = "https://script.google.com/macros/s/AKfycbydUxUavNRdxXxqAl3jeKicFHTh1Zpz7LibMX-nLcPPSoGrLC-Om70fEeJSyFMgU-Vs/exec";

      var http = new XMLHttpRequest();

      var u = window.get_currentUser();
      
      //console.log(window.sunny.get_current_sharing_folder());
      
      var b64_obj = {
        b64: b64
      }
      

      var b64_obj_str = JSON.stringify(b64_obj);
      

      
      //console.log(b64_obj_str);
      b64_obj_str = encodeURIComponent(b64_obj_str);
     
      
      fname = encodeURIComponent(fname);
      //console.log(fname);
      console.log(window.sunny.get_current_sharing_folder());
      //var params = "imgLink="+fileId+"&deckId="+presentId+"&data="+data;
      //var params = "imgLink_with_contentUrl="+fileId+"&deckId="+presentId+"&data="+data;
      var params = "copy_one_blob_to_sharing_folder=xxx"+"&b64_obj_str="+b64_obj_str+"&fname="+fname+"&sharing_folder_id="+window.sunny.get_current_sharing_folder();

      
      //console.log(params);
     

      http.open("POST", url, true);

      //Send the proper header information along with the request
      http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

      //Call a function when the state changes.
      http.onreadystatechange = function() {
          if (http.readyState==4) {
          //alert the user that a response now exists in the responseTest property.
          //console.log("created slideID: ",http.responseText);

          //console.log(http.responseText);
          if(http.responseText.indexOf("error:") != -1)
          {
            alert(http.responseText);
            var info = {
              imgId : ""
            }
            callback(info);
          }
          else if(http.responseText =="")
          {
            var info = {
              imgId : "",
            }
            callback(info);
          }
          else
          {
                 
            //console.log(http.responseText);
            //console.log(JSON.parse(http.responseText));
            
            callback(JSON.parse(http.responseText));
            
          }
          
          newly_uploaded_fileId = "";
          // And to view in firebug
          //  console.log('xhr',xmlhttp)
          }
      } // end callback

      http.send(params);

    };
    //copy_blobs_to_sharing_folder(e.parameters.thumb_b64_str,e.parameters.org_b64_str, e.parameters.name, e.parameters.sharing_folder_id);
    yestoslideAuto.prototype.copy_blobs_to_sharing_folder = function(thumb_b64,org_b64,fname,org_fname,callback)
    {

      //main_apps_presentation
      var url = apps_script_link_for_presentation;
      console.log(url);
      //var url = "https://script.google.com/macros/s/AKfycbydUxUavNRdxXxqAl3jeKicFHTh1Zpz7LibMX-nLcPPSoGrLC-Om70fEeJSyFMgU-Vs/exec";

      var http = new XMLHttpRequest();

      var u = window.get_currentUser();
      
      console.log(window.sunny.get_current_sharing_folder());
      
      var thumb_obj = {
        thumb_b64: thumb_b64
      }
      var org_obj = {
        org_b64: org_b64
      }

      var thumb_b64_str = JSON.stringify(thumb_obj);
      var org_b64_str = JSON.stringify(org_obj);

      

      thumb_b64_str = encodeURIComponent(thumb_b64_str);
      org_b64_str = encodeURIComponent(org_b64_str);

      console.log(fname);
      //var params = "imgLink="+fileId+"&deckId="+presentId+"&data="+data;
      //var params = "imgLink_with_contentUrl="+fileId+"&deckId="+presentId+"&data="+data;
      var params = "copy_blobs_to_sharing_folder=xxx"+"&thumb_b64_str="+thumb_b64_str+"&org_b64_str="+org_b64_str+"&fname="+fname+"&orgfname="+org_fname+"&sharing_folder_id="+window.sunny.get_current_sharing_folder();

      
      console.log(params);
     

      http.open("POST", url, true);

      //Send the proper header information along with the request
      http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

      //Call a function when the state changes.
      http.onreadystatechange = function() {
          if (http.readyState==4) {
          //alert the user that a response now exists in the responseTest property.
          //console.log("created slideID: ",http.responseText);

          //console.log(http.responseText);
          if(http.responseText.indexOf("error:") != -1)
          {
            alert(http.responseText);
            var info = {
              orgimg : "error",
              thumbimg :"error"
            }
            callback(info);
          }
          else if(http.responseText =="")
          {
            var info = {
              orgimg : "",
              thumbimg :""
            }
            callback(info);
          }
          else
          {
                 
            //console.log(http.responseText);
            //console.log(JSON.parse(http.responseText));
            
            callback(JSON.parse(http.responseText));
            
          }
          
          newly_uploaded_fileId = "";
          // And to view in firebug
          //  console.log('xhr',xmlhttp)
          }
      } // end callback

      http.send(params);

    };
    yestoslideAuto.prototype.copy_imgages_to_sharing_folder = function(orgimg,thumbimg,callback)
    {

      //main_apps_presentation
      var url = apps_script_link_for_presentation;
      console.log(url);
      //var url = "https://script.google.com/macros/s/AKfycbydUxUavNRdxXxqAl3jeKicFHTh1Zpz7LibMX-nLcPPSoGrLC-Om70fEeJSyFMgU-Vs/exec";

      var http = new XMLHttpRequest();

      var u = window.get_currentUser();
      
      console.log(window.sunny.get_current_sharing_folder());
      
      //var params = "imgLink="+fileId+"&deckId="+presentId+"&data="+data;
      //var params = "imgLink_with_contentUrl="+fileId+"&deckId="+presentId+"&data="+data;
      var params = "copy_images_to_sharing_folder=xxx"+"&orgimg="+orgimg+"&thumbimg="+thumbimg+"&sharing_folder_id="+window.sunny.get_current_sharing_folder();

      
      console.log(params);
     

      http.open("POST", url, true);

      //Send the proper header information along with the request
      http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

      //Call a function when the state changes.
      http.onreadystatechange = function() {
          if (http.readyState==4) {
          //alert the user that a response now exists in the responseTest property.
          //console.log("created slideID: ",http.responseText);

          //console.log(http.responseText);
          if(http.responseText.indexOf("error:") != -1)
          {
            alert(http.responseText);
            var info = {
              orgimg : "error",
              thumbimg :"error"
            }
            callback(info);
          }
          else if(http.responseText =="")
          {
            var info = {
              orgimg : "",
              thumbimg :""
            }
            callback(info);
          }
          else
          {
                 
            //console.log(http.responseText);
            //console.log(JSON.parse(http.responseText));
            
            callback(JSON.parse(http.responseText));
            
          }
          
          newly_uploaded_fileId = "";
          // And to view in firebug
          //  console.log('xhr',xmlhttp)
          }
      } // end callback

      http.send(params);

    };

    yestoslideAuto.prototype.insertImageToNewSlides = function(fileId,presentId,incarved_data,callback)
    {

      if(fileId =="")
      {
        alert("first upload image to google drive");
        var info = {
          slideId : "error",
          contentUrl :"error"
        }
        callback(info);
        return;
      }
      
      //main_apps_presentation
      var url = apps_script_link_for_presentation;
      console.log(url);
      //var url = "https://script.google.com/macros/s/AKfycbydUxUavNRdxXxqAl3jeKicFHTh1Zpz7LibMX-nLcPPSoGrLC-Om70fEeJSyFMgU-Vs/exec";

      var http = new XMLHttpRequest();

      var u = window.get_currentUser();
      
      console.log(window.sunny.get_current_sharing_folder());
      var myJSON = JSON.stringify(incarved_data);
      console.log(myJSON);

      var data = encodeURIComponent(myJSON);
      //var params = "imgLink="+fileId+"&deckId="+presentId+"&data="+data;
      //var params = "imgLink_with_contentUrl="+fileId+"&deckId="+presentId+"&data="+data;
      var params = "imgLink_with_contentUrl_v2="+fileId+"&deckId="+presentId+"&sharing_folder_id="+window.sunny.get_current_sharing_folder()+"&data="+data;

      
      console.log(params);
     

      http.open("POST", url, true);

      //Send the proper header information along with the request
      http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

      //Call a function when the state changes.
      http.onreadystatechange = function() {
          if (http.readyState==4) {
          //alert the user that a response now exists in the responseTest property.
          //console.log("created slideID: ",http.responseText);

          console.log(http.responseText);
          if(http.responseText.indexOf("error:") != -1)
          {
            alert(http.responseText);
            var info = {
              slideId : "error",
              contentUrl :"error"
            }
            callback(info);
          }
          else if(http.responseText =="")
          {
            var info = {
              slideId : "",
              contentUrl :""
            }
            callback(info);
          }
          else
          {
                 
            console.log(http.responseText);
            console.log(JSON.parse(http.responseText));
            
            callback(JSON.parse(http.responseText));
            
          }
          
          newly_uploaded_fileId = "";
          // And to view in firebug
          //  console.log('xhr',xmlhttp)
          }
      } // end callback

      http.send(params);

    };


    yestoslideAuto.prototype.insert_incarved_data =function(thumb_deckId,thumb_slideId,org_deckId,origin_slideId,data,callback){

      var url = apps_script_link_for_presentation;
      console.log(url);
      //var url = "https://script.google.com/macros/s/AKfycbydUxUavNRdxXxqAl3jeKicFHTh1Zpz7LibMX-nLcPPSoGrLC-Om70fEeJSyFMgU-Vs/exec";

      var http = new XMLHttpRequest();

      var u = window.get_currentUser();
      
      
      //var myJSON = JSON.stringify(incarved_data);
      //console.log(myJSON);

      //var data = encodeURIComponent(myJSON);
      //var params = "imgLink="+fileId+"&deckId="+presentId+"&data="+data;
      //var params = "imgLink_with_contentUrl="+fileId+"&deckId="+presentId+"&data="+data;
      
      var obj = {
        thumb_deckId:thumb_deckId,
        thumb_slideId:thumb_slideId,
        org_deckId:org_deckId,
        origin_slideId:origin_slideId,
        data:data,
        original_slide_only:window.sunny.is_original_slide_only()

      }

      var myJSON = JSON.stringify(obj);
      console.log(myJSON);

      console.log(JSON.parse(myJSON));
      myJSON = encodeURIComponent(myJSON);
      var params = "insert_incarved_data="+myJSON;

      
     

      //console.log(params);

           
      http.open("POST", url, true);

      //Send the proper header information along with the request
      http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

      //Call a function when the state changes.
      http.onreadystatechange = function() {
          if (http.readyState==4) {
          
            
            callback(JSON.parse(http.responseText));
            
          
          
            newly_uploaded_fileId = "";
          
          }
      } // end callback

      http.send(params);
    }
    yestoslideAuto.prototype.insertImageToNewSlides_without_incarved_data = function(is_original,fileId,presentId,callback)
    {

      
      if(window.sunny.is_original_slide_only() && is_original == false)
      {
        var info = {
          slideId : "original_slide_only",
          contentUrl :"original_slide_only"
        }
        console.log("insertImageToNewSlides_without_incarved_data", is_original);
        callback(info);
        return;
      }
      if(fileId =="")
      {
        alert("first upload image to google drive");
        var info = {
          slideId : "",
          contentUrl :""
        }
        callback(info);
        return;
      }
      
      //main_apps_presentation
      var url = apps_script_link_for_presentation;
      console.log(url);
      //var url = "https://script.google.com/macros/s/AKfycbydUxUavNRdxXxqAl3jeKicFHTh1Zpz7LibMX-nLcPPSoGrLC-Om70fEeJSyFMgU-Vs/exec";

      var http = new XMLHttpRequest();

      var u = window.get_currentUser();
      
      console.log(window.sunny.get_current_sharing_folder());
      //var myJSON = JSON.stringify(incarved_data);
      //console.log(myJSON);

      //var data = encodeURIComponent(myJSON);
      //var params = "imgLink="+fileId+"&deckId="+presentId+"&data="+data;
      //var params = "imgLink_with_contentUrl="+fileId+"&deckId="+presentId+"&data="+data;
      var params = "insertImageToNewSlides_without_incarved_data="+fileId+"&deckId="+presentId;

      
      console.log(params);
     

      http.open("POST", url, true);

      //Send the proper header information along with the request
      http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

      //Call a function when the state changes.
      http.onreadystatechange = function() {
          if (http.readyState==4) {
          //alert the user that a response now exists in the responseTest property.
          //console.log("created slideID: ",http.responseText);

          //console.log(http.responseText);
          if(http.responseText.indexOf("error:") != -1)
          {
            console.log(http.responseText);
            var info = {
              slideId : "",
              contentUrl :""
            }
            callback(info);
          }
          else if(http.responseText =="")
          {
            var info = {
              slideId : "",
              contentUrl :""
            }
            callback(info);
          }
          else
          {
                 
            //console.log(http.responseText);
            //console.log(JSON.parse(http.responseText));
            
            callback(JSON.parse(http.responseText));
            
          }
          
          newly_uploaded_fileId = "";
          // And to view in firebug
          //  console.log('xhr',xmlhttp)
          }
      } // end callback

      http.send(params);

    };


    yestoslideAuto.prototype.set_current_thumbId_for_sorting = function(thumbId)
    {
      current_thumbId_for_sorting = thumbId;
      //console.log("current_thumbId_for_sorting: ", current_thumbId_for_sorting);
    }

    yestoslideAuto.prototype.get_current_thumbId_for_sorting = function()
    {
      return current_thumbId_for_sorting;
    }
    yestoslideAuto.prototype.get_next_or_prev_image = function(dir,callback)
    {
      var current_thumbId = this.get_current_thumbId_for_sorting();
      //console.log(current_thumbId, sorted_imgages_by_property[i].length);
      if(current_thumbId_for_sorting =="")
      {
        callback(0);
        return;
      }
      for(var i = 0; i < sorted_imgages_by_property.length; i++ )
      {
        
        if(current_thumbId == sorted_imgages_by_property[i])
        {
          
          console.log(current_thumbId ,"-",sorted_imgages_by_property[i]);
          if(dir=="prev")
          {
            if(i == 0)
            {
              return;
            }
            else
            {
              callback(i-1);
            }
          }
          else
          {
            if(i == (sorted_imgages_by_property.length-1))
            {
              callback(-1);
            }
            else
            {
              callback(i+1);
            }
          }

          return;
          
        }
      }
      callback(-1);

    };


    yestoslideAuto.prototype.set_sorted_images = function(sortedImages)
    {

      console.log("sortedImages",sortedImages)
      sorted_imgages_by_property = sortedImages.slice();
    }

    yestoslideAuto.prototype.get_sorted_images = function()
    {

      return sorted_imgages_by_property ;
    }
    
    yestoslideAuto.prototype.remove_a_slide = function(imgId)
    {
      
      var u = window.get_currentUser();
      
      var email_hash = window.sha256(u.email);
      
      console.log("navigate_slide",imgId);

      window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/communication_v2/controller/remove_a_slide/').update({
        remove_a_slide:imgId,
        stime:window.firebase.database.ServerValue.TIMESTAMP
      });
      
      /*
      window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/with_controller/').set({
        navigate:imgslideId
      });
      */

      


    }

    yestoslideAuto.prototype.navigate_slide = function(imgslideId)
    {
      
      var u = window.get_currentUser();
      
      var email_hash = window.sha256(u.email);
      
      console.log("navigate_slide",imgslideId);

      window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/communication_v2/controller/navigate/').update({
        navigate:imgslideId,
        stime:window.firebase.database.ServerValue.TIMESTAMP
      });
      
      /*
      window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/with_controller/').set({
        navigate:imgslideId
      });
      */

      


    }

    yestoslideAuto.prototype.serverless_by_controller = function(coordi_needed)
    {
      
      console.log("coordi needed",coordi_needed);
      var u = window.get_currentUser();
      
      var email_hash = window.sha256(u.email);
      
      console.log("serverless",coordi_needed);



      window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/communication_v2/controller/serverless/').update({
        coordi_needed:coordi_needed,
        stime:window.firebase.database.ServerValue.TIMESTAMP
      });
      
      /*
      window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/with_controller/').set({
        navigate:imgslideId
      });
      */

      


    }
    yestoslideAuto.prototype.stop_collecting_by_controller= function(is_collecting)
    {
      var u = window.get_currentUser();
      
      var email_hash = window.sha256(u.email);
      
      console.log("collecting",is_collecting);
      
      /*
      window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/with_controller/').set({
        collecting:is_collecting
      });
      
      
    */
      window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/communication_v2/controller/collecting').update({
        collecting:is_collecting
      });
      
    }


    yestoslideAuto.prototype.set_holding_mode = function(mode)
    {
      
      var u = window.get_currentUser();
      
      var email_hash = window.sha256(u.email);
      
      window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/with_controller/').set({
        holding_mode:mode
      });
    }

    yestoslideAuto.prototype.reloading_coordinator = function()
    {
      
      var u = window.get_currentUser();
      
      var email_hash = window.sha256(u.email);
      
      /*
      window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/with_controller/').set({
        reloading_coordinator:true
      });
      */

      window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/communication_v2/controller/reloading_coordinator').update({
        reloading_coordinator:true
      });

      
    }

   
    yestoslideAuto.prototype.openFullscreen = function() {
      try{
        var elem = document.querySelector("#tobe_full");
        //var elem = window.document.documentElement;
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
          elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
          elem.msRequestFullscreen();
        }
      }
      catch(err)
      {

      }
      
    }

    yestoslideAuto.prototype.closeFullscreen = function() {
      try{
        if (window.document.exitFullscreen) {
          window.document.exitFullscreen();
        } else if (window.document.webkitExitFullscreen) { /* Safari */
          window.document.webkitExitFullscreen();
        } else if (window.document.msExitFullscreen) { /* IE11 */
          window.document.msExitFullscreen();
        }
      }
      catch(err)
      {

      }
      
    }

    var image_content_before_auto = "";
    yestoslideAuto.prototype.set_auto_mode =function(auto,chat_boxID="")
    {
      if(this.is_controller())
      {

        var u = window.get_currentUser();
      
        var email_hash = window.sha256(u.email);
        
        window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/with_controller/').set({
          auto_mode:auto
        });

        this.change_auto_mode(auto);
        return;

      }

      
      
      if(auto)
      {
        
        window.sunny_modal.show_spinner("Loading..");   
        
        console.log(main_iframe.document.getElementById("image_content").src);
        image_content_before_auto = main_iframe.document.getElementById("image_content").src;

        if(chat_boxID != "")
          main_iframe.document.getElementById(chat_boxID).style.visibility = "hidden";
        
        yestoslideAuto.prototype.get_related_slideIds(sunny.get_current_presentationID(), "image",function(ids){
          
          console.log(ids);
          console.log(yestoslideAuto.prototype.get_current_original_presentationID());
          if(ids.length >0)
          {
            
            setTimeout(() => {
              window.sunny_modal.hide_spinner();
            }, 1000);
            main_iframe.document.getElementById("image_content").src = "https://docs.google.com/presentation/d/"+yestoslideAuto.prototype.get_current_original_presentationID()+"/preview?loop=true&start=true&delayms=2000&rm=minimal";
            
          }
          else
            window.sunny_modal.hide_spinner();
            

        });
      }
      else
      {

        //main_iframe.document.getElementById("image_content").src = image_content_before_auto;
        main_iframe.document.getElementById("image_content").src = "";
        //parent.parent.sunny.get_sorted_images()[ parseInt(thumbImgUrl_only)];
        
        var imgId = window.sunny.get_sorted_images()[0];
        //parent.sunny_communicate.display_slide_to_image_content(imgId);
        //main_iframe.document.getElementById("img_collection").contentWindow.do_when_click_img(imgId);
        window.document.getElementById("main_iframe").contentWindow.restore_guide_div();
        
        
        
      }

      this.change_auto_mode(auto);
    }


    

    yestoslideAuto.prototype.set_basic_info_for_history_deck = function(data)
    {
      restored_slides_id = data.slideId;
      current_slides_id = data.slideId;
      current_slides_name = data.title;
      current_orignial_slides_id = data.original_slideId;
    }
    
    yestoslideAuto.prototype.is_coordi_needed = function()
    {
      return coordi_needed ;
    }
    
    yestoslideAuto.prototype.set_coordi_needed = function(needed)
    {
      coordi_needed = needed ;
    }
    var coordinator_exist = false;
    yestoslideAuto.prototype.got_answer_from_coordi = function(coordi_eamil,who,callback)
    {
  
      //callback(true);
      //return;
      console.log(window.sunny.is_coordi_needed(),who);
      if(!window.sunny.is_coordi_needed() && who !="controller")
      {
        console.log("window.sunny.is_coordi_needed()",window.sunny.is_coordi_needed());
        callback(true);
        return;
      }
      
      //var u = get_currentUser();
      var email_hash = window.sha256(coordi_eamil);
      window.sunny.coordinator_exist = false; 
      var d = new Date();
      

      if(who =="controller")
      {
        window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/communication_v2/controller/does_coordi_exist/').update({
          who:who + ":" + d.getTime()
        });
      }
      else
      {
        window.firebase.database().ref('thisisneverthat/current_slides/' + email_hash+ '/' + get_photoID_hash() + '/communication_v2/audience/does_coordi_exist/').update({
          who:who + ":" + d.getTime()
        });
      }
      
  
      setTimeout(() => {
  
        if(window.sunny.coordinator_exist)
        {
          
          callback(true);
        }
        else
        {
          setTimeout(() => {
            if(window.sunny.coordinator_exist)
            {
              
              callback(true);
            }
            else
            {
              setTimeout(() => {
                if(window.sunny.coordinator_exist)
                {
                  
                  callback(true);
                }
                else
                {
                  callback(false);
                }
                
              }, 500);
            }
            
          }, 500);
        }
  
        
      }, 500);
    }


    var fcm_enabled = false;
    yestoslideAuto.prototype.set_fcm_enabled = function(enabled)
    {
      fcm_enabled =enabled;
    }
    yestoslideAuto.prototype.is_fcm_enabled = function(){
      return fcm_enabled;
    }
    yestoslideAuto.prototype.check_sesssionTime = function(){

      if (typeof(Storage) !== "undefined") {
        let start =  (new Date()).getTime();
        localStorage.setItem('sessionTime',start);
        setInterval(function(){ 
          let last = parseInt(localStorage.getItem('sessionTime'));
          let now =  (new Date()).getTime();
    
          const diffTime = Math.abs(now - last + 2000 * 2);
          console.log("diffTime",diffTime);
          if (diffTime > 480000) {
            //_this.authService.logout(1);
          }
         }, 3000);
      }
      
    }
    
    yestoslideAuto.prototype.is_apple_product = function(){
        
      try{
        var module = {
          options: [],
          header: [navigator.platform, navigator.userAgent, navigator.appVersion, navigator.vendor, window.opera],
          dataos: [
              { name: 'Windows Phone', value: 'Windows Phone', version: 'OS' },
              { name: 'Windows', value: 'Win', version: 'NT' },
              { name: 'iPhone', value: 'iPhone', version: 'OS' },
              { name: 'iPad', value: 'iPad', version: 'OS' },
              { name: 'Kindle', value: 'Silk', version: 'Silk' },
              { name: 'Android', value: 'Android', version: 'Android' },
              { name: 'PlayBook', value: 'PlayBook', version: 'OS' },
              { name: 'BlackBerry', value: 'BlackBerry', version: '/' },
              { name: 'Macintosh', value: 'Mac', version: 'OS X' },
              { name: 'Linux', value: 'Linux', version: 'rv' },
              { name: 'Palm', value: 'Palm', version: 'PalmOS' }
          ],
          databrowser: [
              { name: 'Chrome', value: 'Chrome', version: 'Chrome' },
              { name: 'Firefox', value: 'Firefox', version: 'Firefox' },
              { name: 'Safari', value: 'Safari', version: 'Version' },
              { name: 'Internet Explorer', value: 'MSIE', version: 'MSIE' },
              { name: 'Opera', value: 'Opera', version: 'Opera' },
              { name: 'BlackBerry', value: 'CLDC', version: 'CLDC' },
              { name: 'Mozilla', value: 'Mozilla', version: 'Mozilla' }
          ],
          init: function () {
              var agent = this.header.join(' '),
                  os = this.matchItem(agent, this.dataos),
                  browser = this.matchItem(agent, this.databrowser);
              
              return { os: os, browser: browser };
          },
          matchItem: function (string, data) {
              var i = 0,
                  j = 0,
                  html = '',
                  regex,
                  regexv,
                  match,
                  matches,
                  version;
              
              for (i = 0; i < data.length; i += 1) {
                  regex = new RegExp(data[i].value, 'i');
                  match = regex.test(string);
                  if (match) {
                      regexv = new RegExp(data[i].version + '[- /:;]([\\d._]+)', 'i');
                      matches = string.match(regexv);
                      version = '';
                      if (matches) { if (matches[1]) { matches = matches[1]; } }
                      if (matches) {
                          matches = matches.split(/[._]+/);
                          for (j = 0; j < matches.length; j += 1) {
                              if (j === 0) {
                                  version += matches[j] + '.';
                              } else {
                                  version += matches[j];
                              }
                          }
                      } else {
                          version = '0';
                      }
                      return {
                          name: data[i].name,
                          version: parseFloat(version)
                      };
                  }
              }
              return { name: 'unknown', version: 0 };
          }
        };
      
        var e = module.init(),
            debug = '';
        
        debug += 'os.name = ' + e.os.name + '<br/>';
        debug += 'os.version = ' + e.os.version + '<br/>';
        debug += 'browser.name = ' + e.browser.name + '<br/>';
        debug += 'browser.version = ' + e.browser.version + '<br/>';
        
        debug += '<br/>';
        debug += 'navigator.userAgent = ' + navigator.userAgent + '<br/>';
        //debug += 'navigator.appVersion = ' + navigator.appVersion + '<br/>';
        //debug += 'navigator.platform = ' + navigator.platform + '<br/>';
        debug += 'navigator.vendor = ' + navigator.vendor + '<br/>';
        
        //console.log(debug);
        
        var os_name = e.os.name;
        var os_version = e.os.version;
        var browser_name = e.browser.name;

        if(os_name == "iPhone" || os_name =="iPad" || os_name =="Macintosh")
        {
          return true;
        }

        return false;

      }
      catch(err)
      {
        alert(err.message);
        return false;
      }
      

      
 
  }
  yestoslideAuto.prototype.is_apple_iphone = function(){
        
    var module = {
        options: [],
        header: [navigator.platform, navigator.userAgent, navigator.appVersion, navigator.vendor, window.opera],
        dataos: [
            { name: 'Windows Phone', value: 'Windows Phone', version: 'OS' },
            { name: 'Windows', value: 'Win', version: 'NT' },
            { name: 'iPhone', value: 'iPhone', version: 'OS' },
            { name: 'iPad', value: 'iPad', version: 'OS' },
            { name: 'Kindle', value: 'Silk', version: 'Silk' },
            { name: 'Android', value: 'Android', version: 'Android' },
            { name: 'PlayBook', value: 'PlayBook', version: 'OS' },
            { name: 'BlackBerry', value: 'BlackBerry', version: '/' },
            { name: 'Macintosh', value: 'Mac', version: 'OS X' },
            { name: 'Linux', value: 'Linux', version: 'rv' },
            { name: 'Palm', value: 'Palm', version: 'PalmOS' }
        ],
        databrowser: [
            { name: 'Chrome', value: 'Chrome', version: 'Chrome' },
            { name: 'Firefox', value: 'Firefox', version: 'Firefox' },
            { name: 'Safari', value: 'Safari', version: 'Version' },
            { name: 'Internet Explorer', value: 'MSIE', version: 'MSIE' },
            { name: 'Opera', value: 'Opera', version: 'Opera' },
            { name: 'BlackBerry', value: 'CLDC', version: 'CLDC' },
            { name: 'Mozilla', value: 'Mozilla', version: 'Mozilla' }
        ],
        init: function () {
            var agent = this.header.join(' '),
                os = this.matchItem(agent, this.dataos),
                browser = this.matchItem(agent, this.databrowser);
            
            return { os: os, browser: browser };
        },
        matchItem: function (string, data) {
            var i = 0,
                j = 0,
                html = '',
                regex,
                regexv,
                match,
                matches,
                version;
            
            for (i = 0; i < data.length; i += 1) {
                regex = new RegExp(data[i].value, 'i');
                match = regex.test(string);
                if (match) {
                    regexv = new RegExp(data[i].version + '[- /:;]([\\d._]+)', 'i');
                    matches = string.match(regexv);
                    version = '';
                    if (matches) { if (matches[1]) { matches = matches[1]; } }
                    if (matches) {
                        matches = matches.split(/[._]+/);
                        for (j = 0; j < matches.length; j += 1) {
                            if (j === 0) {
                                version += matches[j] + '.';
                            } else {
                                version += matches[j];
                            }
                        }
                    } else {
                        version = '0';
                    }
                    return {
                        name: data[i].name,
                        version: parseFloat(version)
                    };
                }
            }
            return { name: 'unknown', version: 0 };
        }
    };
    
    var e = module.init(),
        debug = '';
    
    debug += 'os.name = ' + e.os.name + '<br/>';
    debug += 'os.version = ' + e.os.version + '<br/>';
    debug += 'browser.name = ' + e.browser.name + '<br/>';
    debug += 'browser.version = ' + e.browser.version + '<br/>';
    
    debug += '<br/>';
    debug += 'navigator.userAgent = ' + navigator.userAgent + '<br/>';
    //debug += 'navigator.appVersion = ' + navigator.appVersion + '<br/>';
    //debug += 'navigator.platform = ' + navigator.platform + '<br/>';
    debug += 'navigator.vendor = ' + navigator.vendor + '<br/>';
    
    //console.log(debug);
    
    var os_name = e.os.name;
    var os_version = e.os.version;
    var browser_name = e.browser.name;

    
    if(os_name =="iPhone")
    {
      return true;
    }

    return false;


    

}
    return yestoslideAuto;
})(this);