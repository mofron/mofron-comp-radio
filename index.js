/**
 * @file mofron-comp-radio/index
 * @feature text size is automatically changed when the height is changed.
 * @author simpart
 */
const mf = require("mofron");
const FormItem = require('mofron-comp-formitem');
const Text     = require("mofron-comp-text");
const evCommon = require("mofron-event-oncommon");
const Click    = require("mofron-event-click");

/**
 * @class Radio
 * @brief radio component for mofron
 */
mf.comp.Radio = class extends FormItem {
    /**
     * initialize radio
     *
     * @param prm_opt (string,array,mofron.comp.Text) radio text list
     * @param prm_opt (array) option
     */
    constructor (po) {
        try {
            super();
            this.name("Radio");
            this.prmMap("text");
            this.prmOpt(po);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    initDomConts (prm) {
        try {
            super.initDomConts();
            this.horizon(true);

            /* init input contents */
            let chk = new mf.Dom({
                          tag: "input", component: this,
                          attr : { type : "radio" }
                      });

            this.target().addChild(
                new mf.Dom({
                    tag: "div", component: this,
                    style: { "display" : "flex" }, addChild: chk
                })
            );
            this.target(chk);

            let chg_evt = (p1,p2,p3) => {
                try {
                    let cbx_evt = p1.changeEvent();
                    for (let cb_idx in cbx_evt) {
                        cbx_evt[cb_idx][0](p1, p1.select(), cbx_evt[cb_idx][1]);
                    }
                } catch (e) {
                    console.error(e.stack);
                    throw e;
                }
            }
            this.event(new evCommon(chg_evt, "onchange"));
            this.child(this.text());
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * check text
     *
     * @param (string/mofron-comp-text) check text contents
     * @return (mofron-comp-text) check text contents
     */
    text (prm) {
        try {
            if (true === mf.func.isInclude(prm, "Text")) {
                prm.event(
                    new Click([
                        (cp1,cp2,cp3) => {
                            cp3.target().getRawDom().click();
                            //cp3.select(!cp3.select())
                        },
                        this
                    ])
                );
            } else if ('string' === typeof prm) {
                this.text().option({ text: prm });
                return;
            }
            return this.innerComp('text', prm, Text);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
   /**
    * item value
    *
    * @param (boolean) true: select
    *                  false: unselect
    * @return (boolean) select status
    * @type tag parameter
    */
    select (flg) {
        try {
            if (undefined === flg) {
                /* getter */
                let ret = this.target().prop("checked");
                return (null === ret) ? false : ret;
            }
            /* setter */
            if ("boolean" !== typeof flg) {
                throw new Error("invalid parameter");
            }
            let chk_buf = this.select();
            this.target().prop("checked", flg);
            if (chk_buf !== flg) {
                let chg_evt = this.changeEvent();
                for (let cidx in chg_evt) {
                    chg_evt[cidx][0](this, flg, chg_evt[cidx][1]);
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    } 
    
    /**
     * item value
     *
     * @param (boolean) the same as 'select'
     * @return (boolean) select status
     * @type tag parameter
     */
    value (prm) {
        try { return this.select(prm); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * clear select
     *
     * @type function
     */
    clear () {
        try { this.select(false); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * radio button size
     *
     * @param (string (size)) radio button size (both height and width)
     * @return (string (size)) radio button size
     * @type tag parameter
     */
    size (prm) {
        try { super.size(prm, prm); } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * radio button height
     *
     * @param (string (size)) radio button height
     * @type tag parameter
     */
    height (prm) {
        try {
            let ret = super.height(prm);
            if (undefined !== prm) {
                this.text().size(prm);
            }
            return ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
}
module.exports = mofron.comp.Radio;
