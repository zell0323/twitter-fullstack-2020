const editUserBtn = document.querySelector('.edit-user-btn')
const cusModalContainer = document.querySelector('.cus-modal-container')
const modalClose = document.querySelector('.modal-close')
const upload_avatar_img = document.querySelector('#upload_avatar_img')
const upload_coverage_img = document.querySelector('#upload_coverage_img')
const image = document.querySelector('#tailoringImg')
editUserBtn.addEventListener('click', function getUserDataRenderPage() {
  // axios.get('/api/users/1')
  //   .then(function (response) {
  //     // 1.handle success
  //     console.log(response)
  //   })
  //   .catch(function (error) {
  //     // 2.handle error
  //     console.log(error)
  //   })
  //   .then(function () {
  //     // 3.always executed
  //   })
  console.log('click')
  fadeIn(cusModalContainer, 'flex')
  blockScroll()
})

modalClose.addEventListener('click', function closeUserData() {
  fadeOut(cusModalContainer)
  unblockScroll()
})

upload_avatar_img.addEventListener('change', function avatarImageToCropper() {
  let file = this.files[0]
  if (file) {
    let reader = new FileReader()
    reader.onload = function (e) {
      let img = e.target.result
      console.log(img)
      image.src = img
      // const crop = new Cropper(image, {
      //   aspectRatio: 16 / 9,
      //   crop(e) {
      //     console.log(e.detail.x)
      //     console.log(e.detail.y)
      //     console.log(e.detail.width)
      //     console.log(e.detail.height)
      //     console.log(e.detail.rotate)
      //     console.log(e.detail.scaleX)
      //     console.log(e.detail.scaleY)
      //   },
      // })
      console.log('d')
    }
    reader.readAsDataURL(file)

  }
})

// fadeIn,...
function fadeIn(element, display, duration = 300) {
  element.style.opacity = element.style.opacity || 0
  element.style.display = display
  element.style.visibility = "visible"

  let opacity = parseFloat(element.style.opacity) || 0
  const timer = setInterval(function () {
    opacity += 20 / duration
    if (opacity >= 1) {
      clearInterval(timer)
      opacity = 1
    }
    element.style.opacity = opacity
  }, 20)
}

function fadeOut(element, duration = 400) {
  let opacity = 1
  const timer = setInterval(function () {
    opacity -= 20 / duration
    if (opacity <= 0) {
      clearInterval(timer)
      opacity = 0
      element.style.display = "none"
      element.style.visibility = "hidden"
    }
    element.style.opacity = opacity
  }, 20)
}

function blockScroll() {
  document.body.style.overflow = 'hidden';
}

function unblockScroll() {
  document.body.style.overflow = null;
}