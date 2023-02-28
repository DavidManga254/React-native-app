export function formatDate(timestamp) {
    // Convert Unix timestamp to milliseconds
    const date = new Date(timestamp * 1000);
  
    // Months array
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
  
    // Get the day, month, and year
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
  
    // Format the date string
    const dateString = `${day} ${months[monthIndex]} ${year}`;
  
    // Get the difference in time from the current date
    const currentDate = new Date();
    const difference = Math.abs(currentDate - date);
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const monthsAgo = Math.floor(days / 30);
    const yearsAgo = Math.floor(monthsAgo / 12);
  
    // Determine the time ago string
    let timeAgoString = "";
    if (yearsAgo > 1) {
      timeAgoString = `${yearsAgo} years ago`;
    } else if (yearsAgo === 1) {
      timeAgoString = `1 year ago`;
    } else if (monthsAgo > 1) {
      timeAgoString = `${monthsAgo} months ago`;
    } else if (monthsAgo === 1) {
      timeAgoString = `1 month ago`;
    } else if (days > 1) {
      timeAgoString = `${days} days ago`;
    } else if (days === 1) {
      timeAgoString = `1 day ago`;
    } else {
      timeAgoString = `today`;
    }
  
    // Return the formatted date string
    return `${dateString} (${timeAgoString})`;
  }
  

  export function futureformatDate(timestamp) {
    const now = Date.now() / 1000; // Convert milliseconds to seconds
    const future = new Date(timestamp * 1000);
    const diff = Math.floor((timestamp - now) / 86400); // Convert seconds to days
  
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
  
    const formattedDate = `${future.getDate()} ${months[future.getMonth()]} ${future.getFullYear()}`;
    let timeDiff = '';
  
    if (diff < 0) {
      timeDiff = 'In the past';
    } else if (diff === 0) {
      timeDiff = 'today';
    } else if (diff === 1) {
      timeDiff = 'tomorrow';
    } else if (diff <= 7) {
      timeDiff = `In ${diff} days`;
    } else if (diff <= 14) {
      timeDiff = 'In one week';
    } else if (diff <= 30) {
      timeDiff = `In ${Math.floor(diff / 7)} weeks`;
    } else if (diff <= 365) {
      timeDiff = `In ${Math.floor(diff / 30)} months`;
    } else {
      timeDiff = `In ${Math.floor(diff / 365)} years and ${Math.floor((diff % 365) / 30)} months`;
    }
  
    return `${formattedDate} (${timeDiff})`;
  }
  