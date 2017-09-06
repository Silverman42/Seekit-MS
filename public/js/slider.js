$(document).ready(function () {
    var indexer = 0;
    var pIndexer = indexer - 1
    var sContainer = $('.slide-container').outerHeight();
    var imgClass = $('.slide-image');
    var zIndex = $('.slide-image').length;
    var zIndex1 = $('.slide-image').length;
    console.log(zIndex1);
    var imgVar
    $('.slide-image').each(function (index, val) {
        console.log($(this).index());
        $(this).css("z-index", zIndex1);
        zIndex1--;
    })

    function slider() {
        if (indexer == 0 && pIndexer < indexer) {
            imgClass.eq(indexer).animate({
                top: "-" + sContainer + 2 + "px"
            }, 3000);
            pIndexer = indexer - 1;
            indexer++;
        } else if (indexer == 0 && pIndexer > indexer) {
            imgClass.eq(indexer).animate({
                top: "0px"
            }, 3000);
            pIndexer = indexer - 1;
        } else if ((indexer !== 0 && pIndexer < indexer) && indexer !== zIndex - 1) {
            imgClass.eq(indexer).animate({
                top: "-" + sContainer + 2 + "px"
            }, 3000);
            pIndexer = indexer - 1;
            indexer++;
        } else if (indexer !== 0 && pIndexer > indexer) {
            imgClass.eq(indexer).animate({
                top: "0px"
            }, 3000);
            pIndexer = indexer + 1;
            indexer--;
        } else if (indexer == zIndex - 1) {
            indexer--;
            console.log(indexer);
            pIndexer = indexer + 1;
            console.log(pIndexer);
        }
    }
    $('.control').click(function () {
        if ($(this).index() == 0) {
            if (indexer !== zIndex - 1) {
                indexer++;
                pIndexer = indexer - 1;
                setTimeout(slider, 100);
            }
        }
        else if($(this).index() == 1){
            if (indexer !== 0) {
                indexer--;
                pIndexer = indexer + 1;
                setTimeout(slider, 100);
            }
        }
    })
    animateSlider = setInterval(slider, 4000);
});