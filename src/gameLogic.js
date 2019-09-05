class ItalianQuiz {
  constructor(counter) {
    this.intervalId;
    this.counter = counter;
    this.startCounter = this.startCounter.bind(this);
    this.questionNumber = 0;
  }

  startCounter() {
    this.intervalId = setInterval(() => {
      this.counter--;
      console.log(this.counter);
      // Display 'counter' wherever you want to display it.

      if (this.counter <= 0) {
        this.counter = 0;

        clearInterval(this.intervalId);

        $("#game-section").fadeOut(1000);
        $("#final-section").fadeIn(1200, function() {
          $(this).removeClass("display");
        });
        return;
      } else {
        $("#time").text(this.counter);
      }
    }, 1000);
  }
}
