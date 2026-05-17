#!/bin/bash
set +e
UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127 Safari/537.36'

dl() {
  local url="$1" out="$2"
  echo ">> $out"
  curl -sLA "$UA" --max-time 60 -o "$out" "$url" || echo "  FAILED: $url"
  ls -la "$out" 2>/dev/null
}

# === IMAGES ===
# Hero background (mountain forest)
dl "https://framerusercontent.com/images/x1ioW6hoCO0EWJfApnLyqDWxrs.png" static/giga/images/hero-bg.png
# Custom Agents - Create new agent UI mockup
dl "https://framerusercontent.com/images/iCYwviY1oz4DvLeRAVJwyI0RT0.png?scale-down-to=2048" static/giga/images/agent-canvas-ui.png
# Custom Agents small icon
dl "https://framerusercontent.com/images/6Z4Aldc9q0azIZt1y8QikyWbVis.png?width=80&height=80" static/giga/images/agent-icon.png
# Smart Insights UI mockup (analytics card)
dl "https://framerusercontent.com/images/nw1nKNo2mCT3T2ZcAZEbjhzyzIE.png?scale-down-to=2048" static/giga/images/insights-ui.png
# DoorDash Customer Spotlight photo
dl "https://framerusercontent.com/images/CMSehIg25fZdZaxossQ9pXfXTI.jpg?scale-down-to=2048" static/giga/images/spotlight-doordash.jpg
# Andy Fang avatar
dl "https://framerusercontent.com/images/0Tlkpcg0rCJ2VfQzeU83Y6rpg.webp?width=416&height=416" static/giga/images/spotlight-avatar.webp
# Andy Fang avatar bg (alternate)
dl "https://framerusercontent.com/images/6mcf62RlDfRfU61Yg5vb2pefpi4.png?width=256&height=256" static/giga/images/spotlight-avatar-bg.png
# Cert badges
dl "https://framerusercontent.com/images/UMQkTC61Vg5Wr4RUAQEwTVAU554.png?width=457&height=457" static/giga/images/cert-soc2.png
dl "https://framerusercontent.com/images/Swd9t6HbYJ9sNjWyRjc6QKF6o74.png?width=457&height=457" static/giga/images/cert-iso42001.png
dl "https://framerusercontent.com/images/RPk7qCwNoBPKcmJAe3o8IuiemA.png?width=457&height=457" static/giga/images/cert-iso27001.png
# Logo (top of page)
dl "https://framerusercontent.com/images/4n345Z2FuAud4fhrJ7Q4FtE5eY.png?width=1322&height=1324" static/giga/images/giga-logo.png
dl "https://framerusercontent.com/images/LaQ6HFt6vou1m4B0lxuFvMrjejI.png?width=96&height=96" static/giga/images/giga-mark.png
# Other (KwSrFTdjUqgh9N8xwlxRBf7qic — 2640x2352, second product image)
dl "https://framerusercontent.com/images/KwSrFTdjUqgh9N8xwlxRBf7qic.png?scale-down-to=2048" static/giga/images/voice-poster.png

# === VIDEOS ===
dl "https://framerusercontent.com/assets/lt3r9RT6cCKh8i9Cy7jtB8i2HI.mp4" static/giga/videos/voice-experience.mp4
dl "https://framerusercontent.com/assets/chRFmBq9ayObGUcObGO5vqKAVQ.mp4" static/giga/videos/demo-bg.mp4

# === FONTS ===
# Emilio (display serif)
dl "https://framerusercontent.com/assets/5gyh90sizT7zuGcWB8UHjZXd3c.woff" static/giga/fonts/emilio-light.woff
dl "https://framerusercontent.com/assets/Ipw7oud9mVSfmkh7kHGMm892Q4.woff" static/giga/fonts/emilio-regular.woff
dl "https://framerusercontent.com/assets/31g1ax61IR5fvCayTwXQyq69EZc.woff2" static/giga/fonts/emilio-semibold.woff2
dl "https://framerusercontent.com/assets/oGMi1t4sd9uDAJNp2CVmAeWnNPw.woff" static/giga/fonts/emilio-thin.woff
dl "https://framerusercontent.com/assets/sBy4myG53smtCDd31r7wiZCSqX8.woff2" static/giga/fonts/emilio-trial-light.woff2
dl "https://framerusercontent.com/assets/xc09FYbZCwJGTgSkkYF85XO6LVQ.woff2" static/giga/fonts/emilio-trial-regular.woff2
dl "https://framerusercontent.com/assets/TVpl0mE4QIiCLodQE5B9wX5nH68.woff" static/giga/fonts/emilio-extralight.woff
dl "https://framerusercontent.com/assets/YzVlhfu6B4sP7xiz6BN9Jkq5U.woff" static/giga/fonts/emilio-light-italic.woff
dl "https://framerusercontent.com/assets/FiiInSo9SpDUlgBGfYTUpVwWaT4.woff" static/giga/fonts/emilio-regular-italic.woff
dl "https://framerusercontent.com/assets/GZozME3HlfXlrBMlGF6ZVtBh7Ac.woff" static/giga/fonts/emilio-semibold-italic.woff
# Giga Sans Display
dl "https://framerusercontent.com/assets/zbcP3gqwgWZKzR2nnO3wxT9uTVw.woff2" static/giga/fonts/giga-sans-display-400.woff2
dl "https://framerusercontent.com/assets/O6d3iSZK1sGU0jru1j7OxFwhRw.woff2" static/giga/fonts/giga-sans-display-500.woff2
dl "https://framerusercontent.com/assets/ocoToecouvamIVzaY1ku6nysU.woff2" static/giga/fonts/giga-sans-display-600.woff2
# Giga Sans Text
dl "https://framerusercontent.com/assets/zmRPZZSMbAJ3pU8ZNqgdZvuDxA.woff2" static/giga/fonts/giga-sans-text-400.woff2
dl "https://framerusercontent.com/assets/YgLnYiTfRKd8uvNEalADQAFa3Q.woff2" static/giga/fonts/giga-sans-text-500.woff2
dl "https://framerusercontent.com/assets/V9eWgTgRkSipyZFk0nXcaQi64.woff2" static/giga/fonts/giga-sans-text-600.woff2

