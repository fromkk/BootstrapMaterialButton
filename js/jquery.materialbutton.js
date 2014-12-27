var MaterialButton = (function()
{
    var material_arrow_classes = {
        "cross"       : true,
        "arrow-left"  : true,
        "arrow-right" : true,
        "triangle"    : true,
        "rect"        : true,
        "dial"        : true
    };
    var material_active_event = 'material.activated';
    var material_inactive_event = 'material.inactivated';
    function MaterialButton(element, jq)
    {
        var self = this;
        this.element = element;
        this.$ = jq;
        var material_class = this.$(this.element).data('material');
        if ( typeof material_arrow_classes[material_class] === 'undefined' )
        {
            return this;
        }
        this.class_name = 'material-button-' + material_class;
        this.$(this.element).on('click', function(e)
        {
            return self.clicked_element(e, this);
        });
        return this;
    }
    MaterialButton.prototype.clicked_element = function(event, element)
    {
        if ( this.$(element).hasClass(this.class_name) )
        {
            this.$(element).removeClass(this.class_name);
            this.$(element).trigger(material_inactive_event);
        } else
        {
            this.$(element).addClass(this.class_name);
            this.$(element).trigger(material_active_event);
        }

        event.preventDefault();
        return false;
    };

    return MaterialButton;
})();

(function(jq)
{
    jq.fn.materialbutton = function()
    {
        var material_button, key = 'material_button';
        jq(this).each(function()
        {
            material_button = jq(this).data(key);
            if ( typeof material_button === 'undefined' )
            {
                material_button = new MaterialButton(this, jq);
                jq(this).data(key, material_button);
            }
        });
    };
})(jQuery);