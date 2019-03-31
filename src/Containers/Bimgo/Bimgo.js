// Homemade
import { Board } from 'Components';
import { Actions } from 'Redux/Ducks';

// Node modules
import { PropTypes } from 'prop-types';
import { default as React, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

@connect(store => ({
    bimgo: store.bimgo,
}), dispatch => ({
    actions: {
        fetchWords: bindActionCreators(Actions.bimgo.fetchAll, dispatch),
    },
}))
export default class Bimgo extends Component {
    // TODO: Create a file for overlapping proptype definitions
    static propTypes = {
        actions: PropTypes.objectOf(PropTypes.func).isRequired,
        bimgo: PropTypes.object.shape({
            words: PropTypes.arrayOf(
                PropTypes.shape({
                    word: PropTypes.string.isRequired,
                    id: PropTypes.number.isRequired,
                }),
            ).isRequired,
        }).isRequired,
    }

    componentDidMount() {
        this.fetchWords();
    }

    fetchWords() {
        const { actions } = this.props;
        actions.fetchWords();
    }

    handleComplete() {
        console.log('done!');

        // Get some new words d;)
        this.fetchWords();
    }

    render() {
        const { bimgo } = this.props;

        return (
            <div>
                <header>
                    <h1>Bimgo!</h1>
                    <h2>Rules:</h2>
                    <ol>
                        <li>Zonder valsspeel</li>
                    </ol>
                </header>
                <content>
                    {bimgo.words.length > 0
                        ? <Board onComplete={this.handleComplete.bind(this)} words={bimgo.words} />
                        : <span>Loading bimgo board....</span>
                    }
                </content>
            </div>
        );
    }
}
