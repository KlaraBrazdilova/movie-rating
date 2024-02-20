import React,  {Component} from "react";


export default class CustomModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            activeItem: this.props.activeItem,
        };
    }

    handleChange = (e) => {
        let {name, value} = e.target;

        if (e.target.type === "checkbox") {
            value = e.target.checked;
        }

        const activeItem = {...this.state.activeItem, [name]:value};
        this.setState({activeItem});
    }

    render(){  
        const { toggle, onSave } = this.props;
        var button_text = "create"      
        if (this.state.activeItem.id) {
            button_text = "edit"
        } 
        return (
            <dialog  class="open:bg-white dark:open:bg-slate-900 open:ring-1 open:ring-black/5 dark:open:ring-white/10 open:shadow-lg p-6 rounded-lg w-[30rem]" open>
                <p class="text-sm leading-6 text-slate-900 dark:text-white font-semibold select-none">Movie</p>
                <form method="dialog">
                    <label class="mt-5 block text-sm font-medium text-slate-900 dark:text-slate-400 ">Title</label>
                    <input id="title" name="title" 
                            onChange={this.handleChange}
                            value={this.state.activeItem.title}
                            class="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
                            />
                    <label class="mt-5 block text-sm font-medium text-slate-900 dark:text-slate-400 ">Rating</label>
                    <input id="rating" name="rating" 
                            onChange={this.handleChange}
                            value={this.state.activeItem.rating} 
                            class="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
                            />
                    <button onClick={() => onSave(this.state.activeItem)}
                    class="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        {button_text}
                    </button>
                </form>
            </dialog>
        )
    }
}
