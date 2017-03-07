/**
 * @file mofron-comp-radio/index
 * @author simpart
 */
require('mofron-comp-form');
require('mofron-comp-text');
require('mofron-event-common');

/**
 * @class Radio
 * @brief radio component for mofron
 */
mofron.comp.Radio = class extends mofron.comp.Form {
    /**
     * initialize radio
     *
     * @param prm_opt (string,array,mofron.comp.Text) radio text list
     * @param prm_opt (array) option
     */
    constructor (prm_opt) {
        try {
            super();
            this.name('Radio');
            
            this.m_select = 0;
            this.m_selevt = null;
            
            this.prmOpt(prm_opt);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    initDomConts (prm) {
        try {
            super.initDomConts();

            if (null === prm) {
                return;
            }

            if ('string' === typeof prm) {
                this.addChild(new mofron.comp.Text(prm));
            } else if ('object' === typeof prm) {
                if (undefined === prm[0]) {
                    this.addChild(prm);
                } else {
                    for (var idx in prm) {
                        if ('string' === typeof prm[idx]) {
                            this.addChild(new mofron.comp.Text(prm[idx]));
                        } else if ('object' === typeof prm[idx]) {
                            this.addChild(prm[idx]);
                        }
                    }
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    addChild (chd, disp) {
        try {
            chd.style('float', 'none');
            var elem = new mofron.comp.Radio_Element(this);
            elem.addChild(chd,disp);
            
            var onChange = new mofron.event.Common(
                           function(obj) {
                               try {
                                   var chg = obj[0];
                                   var elm = obj[1];
                                   
                                   var child = chg.child();
                                   for (var idx in child) {
                                       if (child[idx].target().getId() === elm.target().getId()) {
                                           var evt = chg.selectEvent();
                                           if (null !== evt) {
                                               evt(parseInt(idx));
                                           }
                                       }
                                   }
                               } catch (e) {
                                   console.error(e.stack);
                                   throw e;
                               }
                           },
                           [this,elem]);
            onChange.eventName('onchange');
            elem.addEvent(onChange);
            
            super.addChild(elem, disp);
            //this.m_check.push(false);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    selectEvent (fnc) {
        try {
            if (undefined === fnc) {
                return this.m_selevt;
            }
            if (null === fnc) {
                throw new Error('invalid parameter');
            }
            this.m_selevt = fnc;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    select (idx) {
        try {
            if (undefined === idx) {
                /* getter */
                if (true === this.isRendered()) {
                    var child = this.child();
                    for (var idx in child) {
                        if (true === child[idx].target().prop('checked')) {
                            return idx;
                        }
                    }
                    return null;
                } else {
                    var child = this.child();
                    for (var idx in child) {
                        if (true === child[idx].select()) {
                            return idx;
                        }
                    }
                    return null;
                }
            }
            /* setter */
            if ('number' !== typeof idx) {
                throw new Error('invalid parameter');
            }
            if (true === this.isRendered()) {
                this.child()[idx].target().prop('checked', true);
            } else {
                this.child()[idx].select(true);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
mofron.comp.radio = {};
module.exports = mofron.comp.Radio;

mofron.comp.Radio_Element = class extends mofron.Component {
    constructor (rdo) {
        try {
            super();
            this.name('Radio_element');
            this.m_select = false;
            this.m_radio  = rdo;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    initDomConts (prm) {
        try {
            var check = new mofron.Dom('input');
            check.attr('type'  , 'radio');
            check.attr('name'  , this.radioName());
            check.style('float', 'left');
            this.vdom().addChild(check);
            this.target(check);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    select (flg) {
        try {
            if (undefined === flg) {
                /* getter */
                return this.m_select;
            }
            /* setter */
            if ('boolean' === typeof flg) {
                throw new Error('invalid parameter');
            }
            this.m_select = flg;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    radioName () {
        try {
            return this.m_radio.target().getId();
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
