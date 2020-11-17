import React, { Component } from 'react';
import ChoreItems from './ChoreItems';


class ChoreList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            
        };
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        
    }
   
    render() {
        let wheel = () => {
            if (this.state.showWheel) {
                return (
                    <div style={{position: 'relative', height: 210}}>
                        <div id='wheel'>
                            <div className='circle1'>
                            </div>
                            <div className='circle2'>
                            </div>
                            <div className='circle3' onClick={this.selectPrize}></div>
                        </div>
                        <h2 style={{position: 'absolute', bottom: 0}}>Click the spinning wheel to select a prize!</h2>
                    </div>
                )
            } else {
                return (
                    <div><h2>Finish all the chores for a chance to spin the prize wheel!</h2></div>
                )
            }
        }
        //wrote this to fix an error CD
        let showChores = () => {
            if (this.state.items.length > 0) {
                return (
                    <ChoreItems
                        entries={this.state.items}
                        delete={this.deleteItem} />
                )
            }
        }
        

        return (
            <div className='ChoreListMain'>
                <header>
                   <h1> Chore Time</h1>
                </header>
                <div className='header'>
                    <form onSubmit={this.addItem}>
                        <input ref={(a) => this._inputName = a}
                            placeholder='Name'>
                        </input>
                        <input ref={(a) => this._inputElement = a}
                            placeholder='/Enter task'>
                        </input>
                        <button type='submit'>add</button>
                    </form>
                </div>
                {showChores()}
                <div className='header'>
                    <form onSubmit={this.addPrize}>
                        <input ref={(a) => this._inputPrize = a}
                            placeholder='Enter prizes'>
                        </input>
                        <button type='submit'>add</button>
                    </form>
                    {showPrizes()}
                    {wheel()}
                </div>
            </div>
        );
    }
}
export default ChoreList;





