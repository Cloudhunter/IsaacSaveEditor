import React, { MouseEventHandler } from 'react';
import './App.scss';

enum NoteType {
  NORMAL = "",
  WRINKLED = "wrinkled",
  BLOODIED = "bloodied"
}

enum CompletionState {
  NONE = "none",
  NORMAL = "normal",
  HARD = "hard"
}

class CompletionStateHelper {
  private static nextMapping = new Map<CompletionState, CompletionState>([
    [CompletionState.NONE, CompletionState.NORMAL],
    [CompletionState.NORMAL, CompletionState.HARD],
    [CompletionState.HARD, CompletionState.NONE]
  ]);
  private static noteMapping = new Map<CompletionState, NoteType>([
    [CompletionState.NONE, NoteType.NORMAL],
    [CompletionState.NORMAL, NoteType.WRINKLED],
    [CompletionState.HARD, NoteType.BLOODIED]
  ]);
  public static getNext(input:CompletionState):CompletionState {
    var blah:CompletionState|undefined = CompletionStateHelper.nextMapping.get(input);
    if (blah === undefined) {
      return CompletionState.NONE;
    }
    return blah;
  }
  public static getNote(input:CompletionState):NoteType {
    var blah:NoteType|undefined = CompletionStateHelper.noteMapping.get(input);
    if (blah === undefined) {
      return NoteType.NORMAL;
    }
    return blah;
  }
}

type CompletionNoteState = {
  marks: {
    [key: string]: CompletionState
  }
}

type CompletionNoteProps = {
  marks?: {
    [key: string]: CompletionState
  }
}

interface CompletionItemProps {
  type: string
  completed: CompletionState
}

interface CompletionItemClickerProps {
  handleClick: Function
  type: string
}

class CompletionItem extends React.Component<CompletionItemProps, {}> {
  render() {
    return <div className={"completion-item " + this.props.type + " " + this.props.completed}></div>
  }
}

class CompletionItemClicker extends React.Component<CompletionItemClickerProps, {}> {
  render() {
    return <a className={this.props.type} onClick={() => this.props.handleClick(this.props.type)}></a>
  }
}

class CompletionNote extends React.Component<CompletionNoteProps, CompletionNoteState> {
  constructor(p:CompletionNoteProps) {
    super(p);
    var defaultState = CompletionState.HARD
    this.state = {
        marks: {
          delirium: p.marks ? p.marks.delirium ? p.marks.delirium : defaultState : defaultState,
          polaroid: p.marks ? p.marks.polaroid ? p.marks.polaroid : defaultState : defaultState,
          negative: p.marks ? p.marks.negative ? p.marks.negative : defaultState : defaultState,
          cross: p.marks ? p.marks.cross ? p.marks.cross : defaultState : defaultState,
          invertedCross: p.marks ? p.marks.invertedCross ? p.marks.invertedCross : defaultState : defaultState,
          heart: p.marks ? p.marks.heart ? p.marks.heart : defaultState : defaultState,
          star: p.marks ? p.marks.star ? p.marks.star : defaultState : defaultState,
          brimstone: p.marks ? p.marks.brimstone ? p.marks.brimstone : defaultState : defaultState,
          hush: p.marks ? p.marks.hush ? p.marks.hush : defaultState : defaultState,
          cent: p.marks ? p.marks.cent ? p.marks.cent : defaultState : defaultState,
          knife: p.marks ? p.marks.knife ? p.marks.knife : defaultState : defaultState,
          note: p.marks ? p.marks.note ? p.marks.note : defaultState : defaultState
        }
    };
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(type: string) {
    var blah = this.state.marks[type]
    var newState = CompletionStateHelper.getNext(blah);
    // we get the state at the time of click, otherwise it gets toggled twice
    this.setState(prevState => {
      prevState.marks[type] = newState
      return prevState;
      // we cheat and re-use the prevState object to avoid crafting it all
    })
  }
  render() {
    return <div className={"completion-note " + CompletionStateHelper.getNote(this.state.marks.delirium) }>
    {
      Object.keys(this.state.marks).map((keyName) => {
        if(keyName === "delirium") return null;
        return <CompletionItem key={keyName} type={keyName} completed={this.state.marks[keyName]}/>;
      })
    }
      <div className="completion-item clickers">
    {
      Object.keys(this.state.marks).map((keyName) => {
        return <CompletionItemClicker key={keyName} type={keyName} handleClick={this.handleClick}/>;
      })
    }
    </div>
    </div>
  }
}

function App() {
  return (
    <div className="App">
      <CompletionNote/>
    </div>
  );
}

export default App;
