declare type ChangeColorMessage = {
  type: 'CHANGE_COLOR';
  data: {
    color: string;
  };
};

declare type HideScrollbarMessage = {
  type: 'HIDE_SCROLLBAR';
  data: {
    url: string | URL;
  };
};

declare type EXTMessage = ChangeColorMessage | HideScrollbarMessage;
