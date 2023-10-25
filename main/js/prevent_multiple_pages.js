var w_for_prevent_multiple_pages;

function stop_prevent_multiple_pages() {
	try{
		w_for_prevent_multiple_pages.terminate();
		w_for_prevent_multiple_pages = undefined;
	}
	catch(err)
	{

	}
	
  }
function start_prevent_multiple_pages()
{
	var i_am_entrance = false;
	
	try
	{
       i_am_entrance = entrance;
	}
	catch(err)
	{

	}
	
	
  
  
    if (typeof(Worker) !== "undefined") {
        if (typeof(w_for_prevent_multiple_pages) == "undefined") {
			if(i_am_entrance)
			{
				w_for_prevent_multiple_pages = new Worker("/worker_for_present_multiple_pages_for_entrance.js");
				//w_for_prevent_multiple_pages = new Worker("/worker_for_present_multiple_pages.js");
			}
			else
            	w_for_prevent_multiple_pages = new Worker("/worker_for_present_multiple_pages.js");
        }
        w_for_prevent_multiple_pages.onmessage = function(event){
            console.log(event.data);
            
            alert(event.data);
            //window.close();
            setTimeout(() => {
            location.href = "https://google.com";
            }, 200);
        
        };
    }
    
}


setTimeout(() => {
	start_prevent_multiple_pages();
}, 100);