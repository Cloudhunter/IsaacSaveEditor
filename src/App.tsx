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
  public static getNext(input:CompletionState):CompletionState {
    var blah:CompletionState|undefined = CompletionStateHelper.nextMapping.get(input);
    if (blah === undefined) {
      return CompletionState.NONE;
    }
    return blah;
  }
}

type CompletionNoteState = {
  noteType: NoteType,
  marks: {
    [key: string]: CompletionState
  }
}

type CompletionNoteProps = {
  noteType?: NoteType,
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
        noteType: p.noteType ? p.noteType : NoteType.NORMAL,
        marks: {
          polaroid: p.marks ? p.marks.polaroid ? p.marks.polaroid : defaultState : defaultState,
          negative: p.marks ? p.marks.negative ? p.marks.negative : defaultState : defaultState,
          cross: p.marks ? p.marks.cross ? p.marks.cross : defaultState : defaultState,
          invertedCross: p.marks ? p.marks.invertedCross ? p.marks.invertedCross : defaultState : defaultState,
          heart: p.marks ? p.marks.heart ? p.marks.heart : defaultState : defaultState,
          star: p.marks ? p.marks.star ? p.marks.star : defaultState : defaultState,
          shoe: p.marks ? p.marks.shoe ? p.marks.shoe : defaultState : defaultState,
          brimstone: p.marks ? p.marks.brimstone ? p.marks.brimstone : defaultState : defaultState,
          hush: p.marks ? p.marks.hush ? p.marks.hush : defaultState : defaultState,
          cent: p.marks ? p.marks.cent ? p.marks.cent : defaultState : defaultState,
          knife: p.marks ? p.marks.knife ? p.marks.knife : defaultState : defaultState,
          note: p.marks ? p.marks.note ? p.marks.note : defaultState : defaultState
        }
    };
  }
  handleClick(type: string) {
    this.setState(prevState => {
      var blah = prevState.marks[type];
      prevState.marks[type] = CompletionStateHelper.getNext(blah);
      return prevState;
    })
  }
  render() {
    return <div className={"completion-note " + this.state.noteType }>
    {
      Object.keys(this.state.marks).map((keyName) => {
        return <CompletionItem key={keyName} type={keyName} completed={this.state.marks[keyName]}/>;
      })
    }
      <div className="completion-item clickers">
    {
      Object.keys(this.state.marks).map((keyName) => {
        return <CompletionItemClicker key={keyName} type={keyName} handleClick={() => this.handleClick(keyName)}/>;
      })
    }
    </div>
    </div>
  }
}

function App() {
  return (
    <div className="App">
      <CompletionNote noteType={NoteType.BLOODIED}/>
    </div>
  );
}

export default App;
