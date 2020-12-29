/**
 * @file mofron-comp-radio/index.js
 * @brief radio button component for mofron
 * @feature text size is automatically changed when the height is changed.
 * @license MIT
 */
const FormItem = require('mofron-comp-formitem');
const Text     = require("mofron-comp-text");
const onCommon = require("mofron-event-oncommon");
const Click    = require("mofron-event-click");
const comutl   = mofron.util.common;

module.exports = class extends FormItem {
    /**
     * initialize radio component
     *
     * @param (mixed) short-form parameter
     *                key-value: component config
     * @short text
     * @type private
     */
    constructor (prm) {
        try {
            super();
            this.modname("Radio");
            this.shortForm("text");
            /* set config */
	    if (undefined !== prm) {
                this.config(prm);
	    }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * initialize dom contents
     * 
     * @type private
     */
    initDomConts () {
        try {
            super.initDomConts();
            this.horizon(true);
            
            let chk = new mofron.class.Dom({
                          tag: "input", component: this,
                          attrs : { type : "radio" }
                      });
            this.child(
                new mofron.class.Component({
                    style: { "display" : "flex" },
                    childDom: new mofron.class.PullConf({ child: chk }),
                    child: this.text()
                })
            );
            this.childDom(chk);

            /* set change event */
            let radio = this;
            let onchg = () => {
                try {
                    let chg_evt = radio.changeEvent();
                    for (let cidx in chg_evt) {
                        chg_evt[cidx].exec(radio,radio.select());
                    }
                } catch (e) {
                    console.error(e.stack);
                    throw e;
                }
            }
            this.event(new onCommon(onchg,"onchange"), { private:true });
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * radio text
     *
     * @param (mixed) string: radio text contents
     *                mofron-comp-text: radio text contents
     *                undefined: call as getter
     * @return (mofron-comp-text) radio text contents
     * @type prameter
     */
    text (prm) {
        try {
            if (true === comutl.isinc(prm, "Text")) {
                prm.event(
                    new Click(comutl.getarg(
                        (cp1,cp2,cp3) => {
                            cp3.childDom().getRawDom().click();
                        },
                        this
                    ))
                );
            } else if ('string' === typeof prm) {
                this.text().text(prm);
                return;
            }
            return this.innerComp('text', prm, Text);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
   /**
    * select status
    *
    * @param (boolean) true: select
    *                  false: unselect
    *                  undefined: call as getter
    * @return (boolean) select status
    * @type parameter
    */
    select (flg) {
        try {
            let sts = this.childDom().props("checked");
            if (undefined === flg) {
                return sts;
            }
            /* setter */
            if ("boolean" !== typeof flg) {
                throw new Error("invalid parameter");
            }
            this.childDom().props({ checked : flg });
            if (flg !== sts) {
                let chg_evt = this.changeEvent();
                for (let cidx in chg_evt) {
                    chg_evt[cidx].exec(this, flg);
                }
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    } 
    
    /**
     * select status
     *
     * @param (boolean) same as 'select'
     * @return (boolean) select status
     * @type parameter
     */
    value (prm) {
        try {
	    return this.select(prm);
	} catch (e) {
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
        try {
	    this.select(false);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * radio button size
     *
     * @param (string(size)) radio button size (both height and width)
     *                       undefined: call as getter
     * @return (mixed) string(size): radio button size
     *                 null: not set
     * @type parameter
     */
    size (prm) {
        try {
	    super.size(prm, prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * radio button height
     *
     * @param (string(size)) radio button height
     *                       undefined: call as getter
     * @return (mixed) string(size): radio button height
     *                 null: not set
     * @type parameter
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
/* end of file */
