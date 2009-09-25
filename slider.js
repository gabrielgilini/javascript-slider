/**
 * @param fatherId string The id attribute of the father UL
 * @param options object contains:
 *          changeDelay int default 5 Time, in seconds, between slide changes
 *          slideStep int default 10 Number of pixels that will be slided per `slideDelay'
 *          slideDelay int default 10 Time, in miliseconds, between animations
 *          slidesTagName string default 'div' TagName of the slide elements
 * @returns object containing start() and stop()
 **/
function Slider(fatherId, options)//changeDelay, slideStep, slideDelay, slidesTagName)
{
    options = options || {};
    var father = document.getElementById(fatherId);
    var slides = Array.prototype.slice.call(father.getElementsByTagName(options['slidesTagName'] || 'div'));
    var last = slides.length - 1;
    var sTicket, lTicket;
    var toSlide = 0;
    var sTop = getHeight(father);
    var cTop = sTop;
    var px = setPx();
    changeDelay = (options['changeDelay'] || 5) * 1000; // seconds
    slideStep = options['slideStep'] || 10; // pixels
    slideDelay = options['slideDelay'] || 10; // ms

    resetSlides();
    start();

    function start()
    {
        lTicket = window.setInterval(slide, changeDelay);
    }

    function stop()
    {
        window.clearInterval(lTicket);
    }

    function slide()
    {
        slides[toSlide].style.zIndex = 0;
        toSlide = (++toSlide > last) ? 0 : toSlide;
        slides[toSlide].style.zIndex = 1;
        sTicket = window.setInterval(_slide, slideDelay);
    }

    function _slide()
    {
        cTop -= slideStep;
        slides[toSlide].style.top = ((cTop < 0) ? 0 : cTop) + px;
        if(cTop <= 0)
        {
            cTop = sTop;
            window.clearInterval(sTicket);
            resetSlides();
        }
    }

    function resetSlides()
    {
        for(var i = 0; i <= last; ++i)
        {
            if(i != toSlide)
            {
                slides[i].style.top = sTop + px;
            }
        }
    }

    function setPx()
    {
        var el = document.createElement('div');
        var px;
        el.style.height = '1px';
        if(el.style.height == '1px')
        {
            px = 'px';
        }
        else
        {
            px = 0;
        }
        el = null;
        return px;
    }

    function getTop(el)
    {
        if(typeof window.getComputedStyle != 'undefined')
        {
            return parseInt(window.getComputedStyle(el, null).getPropertyValue('top'), 10);
        }
        else
        {
            return parseInt(el.currentStyle['top'], 10);
        }
    }

    function getHeight(el)
    {
        if(typeof window.getComputedStyle != 'undefined')
        {
            return parseInt(window.getComputedStyle(el, null).getPropertyValue('height'), 10);
        }
        else if(typeof el.currentStyle != 'undefined')
        {
            return parseInt(el.currentStyle['height'], 10);
        }
        return null;
    }

    father = null;

    return { 'start': start, 'stop': stop };
}