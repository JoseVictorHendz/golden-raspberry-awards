type WinHistory = {
    producer: string;
    interval: number;
    previousWin: number;
    followingWin: number;
  };
  
  export type ProducerHistory = {
    min: WinHistory[];
    max: WinHistory[];
  };
