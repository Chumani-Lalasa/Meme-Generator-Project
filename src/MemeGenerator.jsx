import React, {Component} from "react";

/*
 Intialize state to save the following data:
    top text
    bottom text
    random image (initialize with "https://i.imgflip.com/1bij.jpg")
 */

class MemeGenerator extends Component{
    constructor(){
        super();
        this.state = {
            topText: "",
            bottomText:"",
            randomImg: "https://i.imgflip.com/1bij.jpg",
            allMemeImgs: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        fetch("https://api.imgflip.com/get_memes")
            .then(reponse => reponse.json())
            .then(response => {
                const {memes} = response.data;
                this.setState({allMemeImgs: memes})
            })
    }

    /**
     * We'll be using an API that provides a bunch of meme images.
     * Your task:
     * make an API call to "https://api.imgflip.com/get_memes" and save the
     * data that comes back (`response.data.memes`) to a new state property
     * called `allMemeImgs`. (The data that come back is an array)
     * 
     */

    /**
     * Create the onChange handler method
     * It should update the corresponding state on every change of the input box
     */

    handleChange(event){
        const {name, value} = event.target;
        this.setState({[name]: value})
    }

    /**
     * Create a method that, when the "Gen" button is clicked, chooses one of the
     * memes from our 'allMemeImgs' array at random and makes it so that it is the
     * meme image that shows up in the bottom portion of our meme generator site (`.url`)
     */

    handleSubmit(event){
        event.preventDefault();
        // get a random int (index in the array)
        const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length);

        // get the meme from that index
        const randMemeImg = this.state.allMemeImgs[randNum].url;

        // set `randomImg` to the `.url` of the random item I grabbed
        this.setState({randomImg: randMemeImg});
    }

    render(){
        return(
            <div>
                <form action="" className="meme-form" onSubmit={this.handleSubmit}>
                    {
                        /**
                         * Create 2 input fields, one for the top Text and one for bottomText
                         * Remember that these will be "controlled forms", so make sure to add
                         * all the attributes you'll need for that to work
                         */
                    }
                    <input 
                        type="text" 
                        name="topText"
                        placeholder="Top Text"
                        value={this.state.topText}
                        onChange={this.handleChange}
                    />

                    <input 
                        type="text" 
                        name="bottomText"
                        placeholder="Bottom Text"
                        value={this.state.bottomText}
                        onChange={this.handleChange}
                    />
                    <button >Gen</button>
                </form>
                <div className="meme">
                    <img src={this.state.randomImg} alt="" />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}
export default MemeGenerator;