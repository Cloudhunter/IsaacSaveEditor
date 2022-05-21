import React from 'react';
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

interface CompletionItemState {
  completed: CompletionState
}

interface CompletionItemProps {
  type: string
  completed: CompletionState
}

class CompletionItem extends React.Component<CompletionItemProps, CompletionItemState> {
  constructor(p:CompletionItemProps) {
    super(p)
    this.state = {completed: p.completed}
  }
  handleClick() {
    console.log(this.props.type);
  }
  render() {
    return <div className={"completion-item " + this.props.type + " " + this.state.completed}><a href={"#" + this.props.type} onClick={this.handleClick.bind(this, console.log(this.props.type))}></a></div>
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
  render() {
    return <div className={"completion-note " + this.state.noteType }>
    {
      Object.keys(this.state.marks).map((keyName) => {
        return <CompletionItem key={keyName} type={keyName} completed={this.state.marks[keyName]}/>;
      })
    }
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
