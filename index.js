/**
 * @file mofron-comp-radio/index.js
 * @brief radio button component for mofron
 * @feature text size is automatically changed when the height is changed.
 * @license MIT
 */
const FormItem = require('mofron-comp-formitem');
const Text     = require("mofron-comp-text");
const onCommon = require("mofron-event-oncommon");
const Common   = require("mofron-event-common");
const Click    = require("mofron-event-click");
const ConfArg  = mofron.class.ConfArg;
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

            this.confmng().add('group', { type:'string' });
            this.confmng().add('select',{ type:'boolean', init:false });

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
	    let val_chg = (v1,v2,v3) => {
                let chg_evt = v1.changeEvent();
		for (let cidx in chg_evt) {
                    chg_evt[cidx][0](v1, true, chg_evt[cidx][1]);
		}

		setTimeout(() => {
		    v1.data('select_buff', true);
		},500);
	    };
	    this.event(new onCommon(val_chg,"onchange"), { private:true });

        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }

    afterRender () {
        try {
            super.afterRender();
            if (null !== this.group()) {
                this.childDom().attrs({ "name" : this.group() });
		let grp_buf = mofron.root[0].data('mofron-comp-radio_group_' + this.group());
		if (null === grp_buf) {
                    mofron.root[0].data('mofron-comp-radio_group_' + this.group(), [this]);
		} else {
                    grp_buf.push(this);
		}
            }
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
    text (prm,cnf) {
        try {
            if (true === comutl.isinc(prm, "Text")) {
                prm.event(
                    new Click(new ConfArg(
                        (cp1,cp2,cp3) => {
                            cp3.childDom().getRawDom().click();
                        },
                        this
                    ))
                );
		prm.config(cnf);
            } else if ('string' === typeof prm) {
                this.text().text(prm);
                this.text().config(cnf);
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
	    this.confmng('select',flg);
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
                    chg_evt[cidx][0](this, flg, chg_evt[cidx][1]);
                }
            }
	    this.data('select_buff', flg);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    } 

    selectEvent (fnc,prm) {
        try {
            let sel_evt = (s1,s2,s3) => {
                try {
                    if ((true === s2) && ('function' === typeof fnc)) {
                        fnc(s1,s2,s3);
                    }
                } catch (e) {
                    console.error(e.stack);
                    throw e;
                }
            }
            return this.changeEvent(sel_evt,prm);
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
    size (wid,hei) {
        try {
	    if (0 === arguments.length) {
                return super.width();
	    } else if (1 === arguments.length) {
                super.size(wid, wid);
	    } else {
                super.size(wid, hei);
	    }
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

    group (prm) {
        try {
            return this.confmng('group', prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
/* end of file */
