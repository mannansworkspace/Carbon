
export const copyDataToClipboard = (text: string) => {
    return new Promise((resolve, reject) => {
        // old way of copy data
        if (!navigator.clipboard) {
            const el = document.createElement('textarea');
            el.value = text;
            el.setAttribute('readonly', '');
            el.style.position = 'absolute';
            el.style.left = '-9999px';
            document.body.appendChild(el);
            el.select();
            try {
                document.execCommand('copy');
                resolve(true);
            } catch (e) {
                reject(false);
                console.log('copy error => ', e);
            }
            document.body.removeChild(el);
        } else {
            // copy data using new clipboard apis
            return resolve(navigator.clipboard.writeText(text));
        }
    })
};