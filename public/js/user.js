// 創建formData, 為了之後POST時的資料
const formData = new FormData()

// common element's name
const closeBtnClass = '.close-btn'
const submitBtnClass = '.submit-btn'
const imageContainerClass = '.image-container'
const imagePreviewContainerClass = '.image-preview-container'
const imgInputClass = '#img-input'
const croppedImgInputClass = '#cropped-img-input'
const ImgDeleteClass = '.img-delete'
const cropperTailoringImgClass = '#tailoring-img'
const wordCountShowClass = '.word-count-show'
const wordWarningShowClass = '.count-warning-show'
// independent element's name
const editUserModalShowBtnClass = '.edit-user-btn'
const editUserContainerClass = '.edit-container'
const avatarContainerClass = '.avatar'
const coverageContainerClass = '.coverage'
const avatarCropperContainerClass = '.avatar-cropper-container'
const coverageCropperContainerClass = '.coverage-cropper-container'
const nameWordCountContainer = '.name-count-container'
const introductionWordCountContainer = '.introduction-count-container'
const userNameInput = '.edit-user-name'
const userIntroductionTextarea = '.edit-user-introduction'

// 點擊開啟編輯個人資料Modal
const editUserBtn = document.querySelector(editUserModalShowBtnClass)

// User Profile Modal
const editUserProfileModal = {
  container: document.querySelector(editUserContainerClass),
  closeBtn: document.querySelector(`${editUserContainerClass} ${closeBtnClass}`),
  submitBtn: document.querySelector(`${editUserContainerClass} ${submitBtnClass}`),
  avatarImg: document.querySelector(`${avatarContainerClass} ${imageContainerClass}`),
  avatarPreviewImg: document.querySelector(`${avatarContainerClass} ${imagePreviewContainerClass}`),
  coverageImg: document.querySelector(`${coverageContainerClass} ${imageContainerClass}`),
  coveragePreviewImg: document.querySelector(`${coverageContainerClass} ${imagePreviewContainerClass}`),
  avatarInput: document.querySelector(`${avatarContainerClass} ${imgInputClass}`),
  avatarCroppedInput: document.querySelector(`${avatarContainerClass} ${croppedImgInputClass}`),
  coverageInput: document.querySelector(`${coverageContainerClass} ${imgInputClass}`),
  coverageCroppedInput: document.querySelector(`${coverageContainerClass} ${croppedImgInputClass}`),
  coverageDeleteBtn: document.querySelector(`${coverageContainerClass} ${ImgDeleteClass}`),

  userNameInput: document.querySelector(userNameInput),
  userIntroductionTextarea: document.querySelector(userIntroductionTextarea),
  userNameCountShow: document.querySelector(`${nameWordCountContainer} ${wordCountShowClass}`),
  userIntroductionCountShow: document.querySelector(`${introductionWordCountContainer} ${wordCountShowClass}`),
  userNameWarningShow: document.querySelector(`${nameWordCountContainer} ${wordWarningShowClass}`),
  userIntroductionWarningShow: document.querySelector(`${introductionWordCountContainer} ${wordWarningShowClass}`)
}

// Avatar Cropper Modal
const avatarCropperModal = {
  container: document.querySelector(avatarCropperContainerClass),
  closeBtn: document.querySelector(`${avatarCropperContainerClass} ${closeBtnClass}`),
  submitBtn: document.querySelector(`${avatarCropperContainerClass} ${submitBtnClass}`),
  tailoringImg: document.querySelector(`${avatarCropperContainerClass} ${cropperTailoringImgClass}`)
}

// Coverage Cropper Modal
const coverageCropperModal = {
  container: document.querySelector(coverageCropperContainerClass),
  closeBtn: document.querySelector(`${coverageCropperContainerClass} ${closeBtnClass}`),
  submitBtn: document.querySelector(`${coverageCropperContainerClass} ${submitBtnClass}`),
  tailoringImg: document.querySelector(`${coverageCropperContainerClass} ${cropperTailoringImgClass}`)
}


// 監聽輸入字數
const userNameCountElement = {
  target: editUserProfileModal.userNameInput,
  maximize: 50,
  minimize: 0,
  showCount: editUserProfileModal.userNameCountShow,
  showWarning: editUserProfileModal.userNameWarningShow,
  minimizeWarningMsg: `<span style="color:red">名稱不可為空</span>`,
  maximizeWarningMsg: `<span style="color:red">字數超過上限</span>`,
  minmizeInvalidClass: 'is-null',
  maxmizeInvalidClass: 'is-invalid'
}
const userIntroductionCountElement = {
  target: editUserProfileModal.userIntroductionTextarea,
  maximize: 160,
  showCount: editUserProfileModal.userIntroductionCountShow,
  showWarning: editUserProfileModal.userIntroductionWarningShow,
  maximizeWarningMsg: `<span style="color:red">字數超過上限</span>`,
  maxmizeInvalidClass: 'is-invalid'
}
class countWordsInputAmount {
  constructor({ target, maximize, minimize, showCount, showWarning, minimizeWarningMsg, maximizeWarningMsg, minmizeInvalidClass, maxmizeInvalidClass }) {
    this.target = target
    this.maximize = maximize
    this.minimize = minimize
    this.showCount = showCount
    this.showWarning = showWarning
    this.minimizeWarningMsg = minimizeWarningMsg
    this.maximizeWarningMsg = maximizeWarningMsg
    this.minmizeInvalidClass = minmizeInvalidClass
    this.maxmizeInvalidClass = maxmizeInvalidClass
  }
  startCount() {
    this.target.addEventListener('input', (event) => {
      const count = event.target.value.trim().length
      this.showCount.innerHTML = count
      if (this.maximize === null && this.minimize === null) return
      if (this.maximize !== null) this.ifMaximize(count)
      if (this.minimize !== null) this.ifMinimize(count)
    })
  }
  ifMaximize(count) {
    if (count > this.maximize) {
      this.showWarning.innerHTML = this.maximizeWarningMsg
      this.target.classList.add(this.maxmizeInvalidClass)
    }
    else {
      this.showWarning.innerHTML = ""
      this.target.classList.remove(this.maxmizeInvalidClass)
    }
  }
  ifMinimize(count) {
    console.log(count, this.minimize)
    if (count <= this.minimize) {
      this.showWarning.innerHTML = this.minimizeWarningMsg
      this.target.classList.add(this.minmizeInvalidClass)
    }
    else {
      this.showWarning.innerHTML = ""
      this.target.classList.remove(this.minmizeInvalidClass)
    }
  }
}
const userNameCount = new countWordsInputAmount(userNameCountElement)
userNameCount.startCount()
const userTextareaCount = new countWordsInputAmount(userIntroductionCountElement)
userTextareaCount.startCount()




// 點擊"編輯個人資料""
editUserBtn.addEventListener('click', function getUserDataRenderPage() {
  axios.get(`/api/users/${editUserBtn.id}`) //will change to users/id(id will select by DOM)
    .then(function (response) {
      // 1.handle success
      if (response.data) {
        editUserProfileModal.coverageImg.style.backgroundImage = `url('${response.data.coverage}')` || 'none'
        editUserProfileModal.avatarImg.style.backgroundImage = `url('${response.data.avatar}')` || 'none'
        editUserProfileModal.userNameInput.value = `${response.data.name}`
        editUserProfileModal.userIntroductionTextarea.value = response.data.introduction !== null ? `${response.data.introduction}` : ""
        document.querySelector('.post-user-edit').action = `/api/users/${response.data.id}`
        editUserProfileModal.userNameCountShow.innerHTML = response.data.name !== null ? response.data.name.trim().length : 0
        editUserProfileModal.userIntroductionCountShow.innerHTML = response.data.introduction !== null ? response.data.introduction.trim().length : 0
      } else { throw new Error('Data Type Incorrect') }
    })
    .then(function () {
      // 3.always executed
      blockScroll()
      fadeIn(editUserProfileModal.container, 'flex')
    })
    .catch(function (error) {
      // 2.handle error
      console.log(error)
    })
})

// 關閉"編輯個人資料""
editUserProfileModal.closeBtn.addEventListener('click', function closeUserData() {
  // 當關閉modal時刪除所有form data
  formData.delete('croppedAvatar')
  formData.delete('croppedCoverage')
  formData.delete('name')
  formData.delete('introduction')
  editUserProfileModal.userNameInput.classList.remove('is-invalid')
  editUserProfileModal.userIntroductionTextarea.classList.remove('is-invalid')
  editUserProfileModal.userNameWarningShow.innerHTML = ""
  editUserProfileModal.userIntroductionWarningShow.innerHTML = ""
  fadeOut(editUserProfileModal.container)
  unblockScroll()
})

// 點擊儲存
editUserProfileModal.submitBtn.addEventListener('click', function sendEditData(event) {
  event.preventDefault() // 防止預設的送出
  // 若字數超出上限，防止表單送出

  if (editUserProfileModal.userNameInput.classList.contains('is-null')) {
    postNotification('red', '名稱不可為空！', 'top')
    shakeModal()
  } else if (editUserProfileModal.userNameInput.classList.contains('is-invalid') || editUserProfileModal.userIntroductionTextarea.classList.contains('is-invalid')) {
    postNotification('red', '字數超出上限！', 'top')
    shakeModal()
  } else {
    formData.append('name', document.querySelector("input[name='name']").value)
    formData.append('introduction', document.querySelector("textarea[name='introduction']").value)
    // show form Data
    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ', ' + pair[1]);
    // }
    axios.post(`/api/users/${editUserBtn.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }) //will change to users/id(id will select by DOM)
      .then(function () {
        // 3.always executed
        formData.delete('croppedAvatar')
        formData.delete('croppedCoverage')
        formData.delete('name')
        formData.delete('introduction')

        fadeOut(editUserProfileModal.container)
        setTimeout(function () {
          postNotification('green', '修改成功', 'top');
          setTimeout(function () {
            location.reload(true)
          }, 1300);
        }, 700);

        unblockScroll()
      })
      .catch(function (error) {
        // 2.handle error
        console.log(error)
      })
  }
})

// Cropper.js >> For圖片裁切
// 設定avatar crop物件屬性
const avatarCrop = new Cropper(avatarCropperModal.tailoringImg, {
  viewMode: 3,
  aspectRatio: 1,  // 預設比例
  guides: false,   // 裁剪框的虛線(九宮格)
  autoCropArea: 0.5, // 0-1之間的數值，定義自動剪裁區域的大小，預設0.8
  dragMode: 'move', // 拖曳模式 crop(Default,新增裁剪框) / move(移動裁剪框&圖片) / none(無動作)
  cropBoxResizable: true, // 是否有裁剪框調整四邊八點
  movable: true, // 是否允許移動圖片
  zoomable: true, // 是否允許縮放圖片大小
  rotatable: true,   // 是否允許旋轉圖片
  zoomOnWheel: true, // 是否允許通過滑鼠滾輪來縮放圖片
  zoomOnTouch: true, // 是否允許通過觸控移動來縮放圖片
})

// 監聽avatar圖片上傳事件
editUserProfileModal.avatarInput.addEventListener('change', function avatarImageToCropper() {
  formData.delete('croppedAvatar') //每次開啟時刪除原有的form Data值
  let file = this.files[0]
  if (file) {
    let reader = new FileReader()
    // load >> 將傳入的圖檔載入crop物件
    reader.onload = function (e) {
      let imgSrc = e.target.result
      avatarCropperModal.tailoringImg.src = imgSrc
      avatarCrop.replace(imgSrc, false)
      // 開啟裁切圖片modal
      fadeIn(avatarCropperModal.container, 'flex')
    }
    reader.onerror = function () {
      console.log('error')
    }
    reader.readAsDataURL(file)
  }
})

// 關閉avatar crop畫面
avatarCropperModal.closeBtn.addEventListener('click', function closeAvatarCropper() {
  fadeOut(avatarCropperModal.container)
})

// 送出avatar crop
avatarCropperModal.submitBtn.addEventListener('click', function submitAvatarCropper() {
  const cvs = avatarCrop.getCroppedCanvas()
  const context = cvs.getContext('2d')
  let base64 = cvs.toDataURL('image/jpeg') //轉為jpeg base64
  // https://stackoverflow.com/questions/20512887/imgur-image-uploading-will-not-work-with-base64-data 在上傳前記得把前綴 replace
  // cvs.toBlob((blob) => {
  //   formData.append('croppedAvatar', blob)
  //   console.log(blob)
  // })
  let img = new Image()
  img.src = base64
  img.onload = function () {
    const imgNewSize = 150
    const imgNewWidth = 300
    const imgNewHeight = 300
    let newImg
    // 使用 canvas 調整圖片寬高
    cvs.width = imgNewWidth
    cvs.height = imgNewHeight
    context.clearRect(0, 0, imgNewWidth, imgNewHeight)
    // 調整圖片尺寸
    context.drawImage(img, 0, 0, imgNewWidth, imgNewHeight)
    let compressRatio = 102
    do {
      compressRatio -= 2
      newImg = cvs.toDataURL("image/jpeg", compressRatio / 100)
    } while (Math.round(0.75 * newImg.length / 1000) > imgNewSize)
    // console.log(newImg)
    // 設定預覽圖片
    editUserProfileModal.avatarPreviewImg.style.backgroundImage = `url('${newImg}')`
    // 將dataURL傳入input name="croppedAvatar"
    editUserProfileModal.avatarCroppedInput.value = newImg
    formData.append('croppedAvatar', newImg.replace("data:image/jpeg;base64,", ""))
  }
  fadeOut(avatarCropperModal.container)
})

// 設定coverage crop物件屬性
const coverageCrop = new Cropper(coverageCropperModal.tailoringImg, {
  viewMode: 3,
  aspectRatio: 3.195,  // 預設比例
  guides: false,   // 裁剪框的虛線(九宮格)
  autoCropArea: 1, // 0-1之間的數值，定義自動剪裁區域的大小，預設0.8
  dragMode: 'move', // 拖曳模式 crop(Default,新增裁剪框) / move(移動裁剪框&圖片) / none(無動作)
  cropBoxResizable: true, // 是否有裁剪框調整四邊八點
  movable: true, // 是否允許移動圖片
  zoomable: true, // 是否允許縮放圖片大小
  rotatable: false,   // 是否允許旋轉圖片
  zoomOnWheel: true, // 是否允許通過滑鼠滾輪來縮放圖片
  zoomOnTouch: true, // 是否允許通過觸控移動來縮放圖片
})

// 監聽coverage圖片上傳事件
editUserProfileModal.coverageInput.addEventListener('change', function coverageImageToCropper() {
  formData.delete('croppedCoverage') //每次開啟時刪除原有的form Data值
  let file = this.files[0]
  if (file) {
    let reader = new FileReader()
    // load >> 將傳入的圖檔載入crop物件
    reader.onload = function (e) {
      let imgSrc = e.target.result
      coverageCropperModal.tailoringImg.src = imgSrc
      coverageCrop.replace(imgSrc, false)
      // 開啟裁切圖片modal
      fadeIn(coverageCropperModal.container, 'flex')
    }
    reader.onerror = function () {
      console.log('error')
    }
    reader.readAsDataURL(file)
  }
})

// 關閉coverage crop畫面
coverageCropperModal.closeBtn.addEventListener('click', function closeCoverageCropper() {
  fadeOut(coverageCropperModal.container)
})

// 送出coverage crop
coverageCropperModal.submitBtn.addEventListener('click', function submitCoverageCropper() {
  const cvs = coverageCrop.getCroppedCanvas()
  const context = cvs.getContext('2d')
  let base64 = cvs.toDataURL('image/jpeg')
  // cvs.toBlob((blob) => {
  //   formData.append('croppedCoverage', blob)
  // })
  let img = new Image()
  img.src = base64
  img.onload = function () {
    const imgNewSize = 150
    const imgNewWidth = 852
    const imgNewHeight = 267
    let newImg
    // 使用 canvas 調整圖片寬高
    cvs.width = imgNewWidth
    cvs.height = imgNewHeight
    context.clearRect(0, 0, imgNewWidth, imgNewHeight)
    // 調整圖片尺寸
    context.drawImage(img, 0, 0, imgNewWidth, imgNewHeight)
    let compressRatio = 102
    do {
      compressRatio -= 2
      newImg = cvs.toDataURL("image/jpeg", compressRatio / 100)
    } while (Math.round(0.75 * newImg.length / 1000) > imgNewSize)
    // console.log(newImg)
    // 設定預覽圖片
    editUserProfileModal.coveragePreviewImg.style.backgroundImage = `url('${newImg}')`
    // 將dataURL傳入input name="croppedAvatar"
    editUserProfileModal.coverageCroppedInput.value = newImg
    formData.append('croppedCoverage', newImg.replace("data:image/jpeg;base64,", ""))
  }
  fadeOut(coverageCropperModal.container)
})

// 移除上傳的coverage
editUserProfileModal.coverageDeleteBtn.addEventListener('click', function removeUploadCoverage() {
  editUserProfileModal.coveragePreviewImg.style.backgroundImage = ""
  editUserProfileModal.coverageCroppedInput.value = "" //清除為空；送出資料時若為空，則保留原圖
})


// shake modal
function shakeModal() {
  document.querySelector('.edit-container .cus-modal').classList.add('modal-shake')
  setTimeout(() => {
    document.querySelector('.edit-container .cus-modal').classList.remove('modal-shake')
  }, 300)
}

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
    console.log(opacity)
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
      if (element === editUserProfileModal.container) { //若關閉的是主要編輯畫面
        editUserProfileModal.avatarPreviewImg.style.backgroundImage = ""
        editUserProfileModal.coveragePreviewImg.style.backgroundImage = ""
      }
    }
    element.style.opacity = opacity
  }, 20)
}

function blockScroll() {
  // document.body.style.overflow = 'hidden'
  document.querySelector('.middle').classList.add('modal-open')
}

function unblockScroll() {
  // document.body.style.overflow = null;
  document.querySelector('.middle').classList.remove('modal-open')
}