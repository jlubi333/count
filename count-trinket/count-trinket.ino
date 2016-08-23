#include <TrinketKeyboard.h>

const int PIN_SWITCH = 0;
const int DELAY = 500;

bool down = false;
bool ableToClick = false;
bool delayPassed = true;

int previousTime = 0;
int currentTime = 0;
int elapsed = 0;

void setup() {
  pinMode(PIN_SWITCH, INPUT_PULLUP);
  TrinketKeyboard.begin();
  currentTime = millis();
}

void loop() {
  previousTime = currentTime;
  currentTime = millis();

  if (elapsed >= DELAY) {
    delayPassed = true;
  } else {
    elapsed += currentTime - previousTime;
  }

  TrinketKeyboard.poll();

  if (digitalRead(PIN_SWITCH) == LOW) {
    down = true;
  } else {
    down = false;
    ableToClick = true;
  }

  if (delayPassed && down && ableToClick) {
    TrinketKeyboard.print(" ");
    ableToClick = false;
    delayPassed = false;
    elapsed = 0;
  }
}
