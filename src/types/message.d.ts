declare type EXTMessageType = 'CHANGE_COLOR' | 'CHANGE_NAME';

type EXTMessageData = {
  CHANGE_COLOR: { color: string };
  CHANGE_NAME: { name: string };
};

declare type EXTMessage<T extends EXTMessageType = EXTMessageType> = {
  type: T;
  data: EXTMessageData[T];
};
