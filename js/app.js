const ul = $("ul")[0].children;

function showPage(pageLink, list) {
    // first hide all students on the page
    for (let i = 0; i < ul.length; i++) {
       $(ul[i]).hide();
    }

    let indexStartPos = ((pageLink * 10) - 10);
    let indexEndPos = ((pageLink * 10) - 1);
    // if the indexEndPos is > than the end of the array, set the end position at the last index point of the array
    if (indexEndPos > list.length - 1) { indexEndPos = list.length - 1; }

    // show the students that are in scope
    for (let i = indexStartPos; i <= indexEndPos; i++) {
        $(list[i]).show();
    }
 }

function appendPageLinks(buttonIsPressed ,list) {
   if ($('.pagination')) { $('.pagination').remove();}
    // determine how many pages for this student list
    const pageCount = (list.length / 10 > Math.floor(list.length / 10)) ? Math.floor(list.length / 10) + 1 : list.length / 10;

    // create a page link section
    let pagination = `<div class="pagination"><ul>`;
    for( let i = 0; i < pageCount; i++){
      pagination +=`<li><a`;
      //pressed linked marked as active
      if (buttonIsPressed-1 === i) { pagination += ' class="active" '; }
      pagination +=` href="#">${i+1}</a>
                    </li>`;
    }
    pagination += `</ul></div>`;
    $(".page").append(pagination);

    // add an event handler to the "pagination" div to handle all events on "a" tags
    $('.pagination').on("click", "a", function(event) {
        // determine which button was pressed
        let buttonPressed = $(event.target).parent().index()+1;
        // reload the information on the page with the scope of the new button
        showPage(buttonPressed, list)
        appendPageLinks(buttonPressed, list);

    });

   // if there are less than 10 results, remove the pagination links
   if (ul.length <= 10) {
       $('.pagination').remove();
   }
}

 function searchList() {
    $('.page-header').append('<div class="student-search"><input placeholder="Search for student..."><button>Search</button></div>');

    $('.student-search button').on('click', (event) => {
        // getting search value
        // make sure that the string is in lower case to match student names
        const searchStr = $('.student-search input').val().toLowerCase();


        let searchArray = [];
        for (let i = 0; i < ul.length; i++) {
            // note that the student name is contained in h3
            let studentName = $(ul[i]).find('h3').text();
            let studentEmail = $(ul[i]).find('.email').text();
            // if the search string appears in student name or email
            // add this element to the searchArray
            if (studentName.indexOf(searchStr) >= 0 || studentEmail.indexOf(searchStr) >= 0) {
                searchArray.push(ul[i]);
            }
        }

        // reload the information
        showPage(1, searchArray);
        appendPageLinks(1, searchArray);

        // if there were no search results, display a message instead of students
        if (searchArray.length === 0) {
            $('.page').append(`<h3 class="not-found">No students found ... please try a different search</h3>`);
        }
        if(!searchStr) {
          $('.page').find('.not-found').remove();
        }
    });
 }



//==============
//====ONLOAD====
//==============
showPage(1, ul);
appendPageLinks(1 ,ul);
searchList();
