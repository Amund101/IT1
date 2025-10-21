+   1 <!DOCTYPE html>
+   2 <html lang="no">
+   3 <head>
+   4     <meta charset="UTF-8">
+   5     <meta name="viewport" content="width=device-width, initial-scale=1.0">
+   6     <title>Notatblokk</title>
+   7     <script src="https://cdn.tailwindcss.com"></script>
+   8     <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
+   9     <script>
+  10         tailwind.config = {
+  11             darkMode: 'class',
+  12             theme: {
+  13                 extend: {
+  14                     colors: {
+  15                         primary: '#5D5CDE'
+  16                     }
+  17                 }
+  18             }
+  19         }
+  20     </script>
+  21     <style>
+  22         body {
+  23             font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
+  24         }
+  25         .note-item {
+  26             transition: all 0.2s ease;
+  27         }
+  28         .note-item:hover {
+  29             transform: translateX(4px);
+  30         }
+  31         .fade-in {
+  32             animation: fadeIn 0.3s ease-in;
+  33         }
+  34         @keyframes fadeIn {
+  35             from { opacity: 0; transform: translateY(-10px); }
+  36             to { opacity: 1; transform: translateY(0); }
+  37         }
+  38     </style>
+  39 </head>
+  40 <body class="bg-white dark:bg-[#181818] text-gray-900 dark:text-gray-100 min-h-screen">
+  41     <div class="flex flex-col md:flex-row h-screen">
+  42         <!-- Sidebar -->
+  43         <div class="w-full md:w-80 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col">
+  44             <!-- Header -->
+  45             <div class="p-4 border-b border-gray-200 dark:border-gray-800">
+  46                 <div class="flex items-center justify-between mb-4">
+  47                     <h1 class="text-2xl font-bold flex items-center gap-2">
+  48                         <i class="fas fa-book text-primary"></i>
+  49                         Notatblokk
+  50                     </h1>
+  51                 </div>
+  52                 <button id="newNoteBtn" class="w-full bg-primary hover:bg-primary/90 text-white py-2.5 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2">
+  53                     <i class="fas fa-plus"></i>
+  54                     Nytt notat
+  55                 </button>
+  56             </div>
+  57 
+  58             <!-- Notes List -->
+  59             <div class="flex-1 overflow-y-auto p-4">
+  60                 <div id="notesList" class="space-y-2">
+  61                     <!-- Notes will be inserted here -->
+  62                 </div>
+  63                 <div id="emptyState" class="text-center py-12 text-gray-500 dark:text-gray-400 hidden">
+  64                     <i class="fas fa-sticky-note text-5xl mb-4 opacity-50"></i>
+  65                     <p>Ingen notater ennå</p>
+  66                     <p class="text-sm">Klikk "Nytt notat" for å komme i gang</p>
+  67                 </div>
+  68             </div>
+  69         </div>
+  70 
+  71         <!-- Editor -->
+  72         <div class="flex-1 flex flex-col">
+  73             <!-- Editor Header -->
+  74             <div class="border-b border-gray-200 dark:border-gray-800 p-4 bg-gray-50 dark:bg-gray-900">
+  75                 <input 
+  76                     id="noteTitle" 
+  77                     type="text" 
+  78                     placeholder="Tittel på notat..." 
+  79                     class="w-full text-2xl font-bold bg-transparent border-none outline-none text-base"
+  80                     disabled
+  81                 >
+  82                 <div class="flex items-center gap-4 mt-3 text-sm text-gray-500 dark:text-gray-400">
+  83                     <span id="lastEdited"></span>
+  84                     <span id="charCount">0 tegn</span>
+  85                 </div>
+  86             </div>
+  87 
+  88             <!-- Editor Content -->
+  89             <div class="flex-1 overflow-hidden">
+  90                 <textarea 
+  91                     id="noteContent" 
+  92                     placeholder="Velg et notat eller opprett et nytt..."
+  93                     class="w-full h-full p-6 bg-transparent resize-none outline-none text-base leading-relaxed"
+  94                     disabled
+  95                 ></textarea>
+  96             </div>
+  97 
+  98             <!-- No Note Selected State -->
+  99             <div id="noNoteSelected" class="flex-1 flex items-center justify-center text-gray-400 dark:text-gray-600">
+ 100                 <div class="text-center">
+ 101                     <i class="fas fa-pen-to-square text-6xl mb-4 opacity-30"></i>
+ 102                     <p class="text-lg">Velg et notat eller opprett et nytt</p>
+ 103                 </div>
+ 104             </div>
+ 105         </div>
+ 106     </div>
+ 107 
+ 108     <!-- Delete Confirmation Modal -->
+ 109     <div id="deleteModal" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
+ 110         <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full fade-in">
+ 111             <h3 class="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">Slett notat?</h3>
+ 112             <p class="text-gray-600 dark:text-gray-400 mb-6">Er du sikker på at du vil slette dette notatet? Denne handlingen kan ikke angres.</p>
+ 113             <div class="flex justify-end gap-3">
+ 114                 <button id="cancelDelete" class="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
+ 115                     Avbryt
+ 116                 </button>
+ 117                 <button id="confirmDelete" class="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded-lg transition-colors">
+ 118                     Slett
+ 119                 </button>
+ 120             </div>
+ 121         </div>
+ 122     </div>
+ 123 
+ 124     <script>
+ 125         // Dark mode setup
+ 126         if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
+ 127             document.documentElement.classList.add('dark');
+ 128         }
+ 129         window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
+ 130             if (event.matches) {
+ 131                 document.documentElement.classList.add('dark');
+ 132             } else {
+ 133                 document.documentElement.classList.remove('dark');
+ 134             }
+ 135         });
+ 136 
+ 137         // App State
+ 138         let notes = JSON.parse(localStorage.getItem('notes') || '[]');
+ 139         let currentNoteId = null;
+ 140         let deleteNoteId = null;
+ 141 
+ 142         // DOM Elements
+ 143         const newNoteBtn = document.getElementById('newNoteBtn');
+ 144         const notesList = document.getElementById('notesList');
+ 145         const emptyState = document.getElementById('emptyState');
+ 146         const noteTitle = document.getElementById('noteTitle');
+ 147         const noteContent = document.getElementById('noteContent');
+ 148         const lastEdited = document.getElementById('lastEdited');
+ 149         const charCount = document.getElementById('charCount');
+ 150         const noNoteSelected = document.getElementById('noNoteSelected');
+ 151         const deleteModal = document.getElementById('deleteModal');
+ 152         const cancelDelete = document.getElementById('cancelDelete');
+ 153         const confirmDelete = document.getElementById('confirmDelete');
+ 154 
+ 155         // Initialize
+ 156         function init() {
+ 157             if (notes.length === 0) {
+ 158                 // Create a welcome note
+ 159                 const welcomeNote = {
+ 160                     id: Date.now(),
+ 161                     title: 'Velkommen til Notatblokk!',
+ 162                     content: 'Dette er din første notat. Du kan:\n\n• Redigere teksten her\n• Endre tittelen ovenfor\n• Lage nye notater med knappen øverst til venstre\n• Slette notater ved å klikke på søppelkasse-ikonet\n\nDine notater lagres automatisk i nettleseren din!',
+ 163                     lastEdited: new Date().toISOString()
+ 164                 };
+ 165                 notes.push(welcomeNote);
+ 166                 saveNotes();
+ 167             }
+ 168             renderNotesList();
+ 169             if (notes.length > 0) {
+ 170                 selectNote(notes[0].id);
+ 171             }
+ 172         }
+ 173 
+ 174         // Save notes to localStorage
+ 175         function saveNotes() {
+ 176             localStorage.setItem('notes', JSON.stringify(notes));
+ 177         }
+ 178 
+ 179         // Format date
+ 180         function formatDate(dateString) {
+ 181             const date = new Date(dateString);
+ 182             const now = new Date();
+ 183             const diffMs = now - date;
+ 184             const diffMins = Math.floor(diffMs / 60000);
+ 185             const diffHours = Math.floor(diffMs / 3600000);
+ 186             const diffDays = Math.floor(diffMs / 86400000);
+ 187 
+ 188             if (diffMins < 1) return 'Akkurat nå';
+ 189             if (diffMins < 60) return `${diffMins} min siden`;
+ 190             if (diffHours < 24) return `${diffHours} time${diffHours > 1 ? 'r' : ''} siden`;
+ 191             if (diffDays < 7) return `${diffDays} dag${diffDays > 1 ? 'er' : ''} siden`;
+ 192             
+ 193             return date.toLocaleDateString('no-NO', { 
+ 194                 day: 'numeric', 
+ 195                 month: 'short', 
+ 196                 year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined 
+ 197             });
+ 198         }
+ 199 
+ 200         // Render notes list
+ 201         function renderNotesList() {
+ 202             notesList.innerHTML = '';
+ 203             
+ 204             if (notes.length === 0) {
+ 205                 emptyState.classList.remove('hidden');
+ 206                 return;
+ 207             }
+ 208             
+ 209             emptyState.classList.add('hidden');
+ 210             
+ 211             // Sort notes by last edited (newest first)
+ 212             const sortedNotes = [...notes].sort((a, b) => 
+ 213                 new Date(b.lastEdited) - new Date(a.lastEdited)
+ 214             );
+ 215 
+ 216             sortedNotes.forEach(note => {
+ 217                 const noteItem = document.createElement('div');
+ 218                 noteItem.className = `note-item p-3 rounded-lg cursor-pointer transition-colors ${
+ 219                     currentNoteId === note.id 
+ 220                         ? 'bg-primary/10 border-l-4 border-primary' 
+ 221                         : 'hover:bg-gray-100 dark:hover:bg-gray-800'
+ 222                 }`;
+ 223                 noteItem.dataset.id = note.id;
+ 224 
+ 225                 const preview = note.content.substring(0, 80).replace(/\n/g, ' ');
+ 226                 
+ 227                 noteItem.innerHTML = `
+ 228                     <div class="flex items-start justify-between gap-2">
+ 229                         <div class="flex-1 min-w-0">
+ 230                             <h3 class="font-semibold text-sm truncate mb-1">${note.title || 'Uten tittel'}</h3>
+ 231                             <p class="text-xs text-gray-600 dark:text-gray-400 truncate mb-1">${preview || 'Tomt notat'}</p>
+ 232                             <p class="text-xs text-gray-500 dark:text-gray-500">${formatDate(note.lastEdited)}</p>
+ 233                         </div>
+ 234                         <button class="delete-note-btn text-gray-400 hover:text-red-500 transition-colors flex-shrink-0" data-id="${note.id}">
+ 235                             <i class="fas fa-trash text-sm"></i>
+ 236                         </button>
+ 237                     </div>
+ 238                 `;
+ 239 
+ 240                 noteItem.addEventListener('click', (e) => {
+ 241                     if (!e.target.closest('.delete-note-btn')) {
+ 242                         selectNote(note.id);
+ 243                     }
+ 244                 });
+ 245 
+ 246                 const deleteBtn = noteItem.querySelector('.delete-note-btn');
+ 247                 deleteBtn.addEventListener('click', (e) => {
+ 248                     e.stopPropagation();
+ 249                     showDeleteModal(note.id);
+ 250                 });
+ 251 
+ 252                 notesList.appendChild(noteItem);
+ 253             });
+ 254         }
+ 255 
+ 256         // Select a note
+ 257         function selectNote(id) {
+ 258             const note = notes.find(n => n.id === id);
+ 259             if (!note) return;
+ 260 
+ 261             currentNoteId = id;
+ 262             noteTitle.value = note.title;
+ 263             noteContent.value = note.content;
+ 264             noteTitle.disabled = false;
+ 265             noteContent.disabled = false;
+ 266             noNoteSelected.classList.add('hidden');
+ 267             lastEdited.textContent = `Sist redigert: ${formatDate(note.lastEdited)}`;
+ 268             updateCharCount();
+ 269             renderNotesList();
+ 270         }
+ 271 
+ 272         // Update character count
+ 273         function updateCharCount() {
+ 274             const count = noteContent.value.length;
+ 275             charCount.textContent = `${count} tegn`;
+ 276         }
+ 277 
+ 278         // Create new note
+ 279         function createNewNote() {
+ 280             const newNote = {
+ 281                 id: Date.now(),
+ 282                 title: '',
+ 283                 content: '',
+ 284                 lastEdited: new Date().toISOString()
+ 285             };
+ 286             notes.push(newNote);
+ 287             saveNotes();
+ 288             renderNotesList();
+ 289             selectNote(newNote.id);
+ 290             noteTitle.focus();
+ 291         }
+ 292 
+ 293         // Update current note
+ 294         function updateCurrentNote() {
+ 295             if (!currentNoteId) return;
+ 296 
+ 297             const note = notes.find(n => n.id === currentNoteId);
+ 298             if (!note) return;
+ 299 
+ 300             note.title = noteTitle.value || 'Uten tittel';
+ 301             note.content = noteContent.value;
+ 302             note.lastEdited = new Date().toISOString();
+ 303             
+ 304             saveNotes();
+ 305             lastEdited.textContent = `Sist redigert: ${formatDate(note.lastEdited)}`;
+ 306             renderNotesList();
+ 307         }
+ 308 
+ 309         // Show delete modal
+ 310         function showDeleteModal(id) {
+ 311             deleteNoteId = id;
+ 312             deleteModal.classList.remove('hidden');
+ 313         }
+ 314 
+ 315         // Hide delete modal
+ 316         function hideDeleteModal() {
+ 317             deleteModal.classList.add('hidden');
+ 318             deleteNoteId = null;
+ 319         }
+ 320 
+ 321         // Delete note
+ 322         function deleteNote(id) {
+ 323             notes = notes.filter(n => n.id !== id);
+ 324             saveNotes();
+ 325             
+ 326             if (currentNoteId === id) {
+ 327                 currentNoteId = null;
+ 328                 noteTitle.value = '';
+ 329                 noteContent.value = '';
+ 330                 noteTitle.disabled = true;
+ 331                 noteContent.disabled = true;
+ 332                 noNoteSelected.classList.remove('hidden');
+ 333                 lastEdited.textContent = '';
+ 334                 charCount.textContent = '0 tegn';
+ 335                 
+ 336                 if (notes.length > 0) {
+ 337                     selectNote(notes[0].id);
+ 338                 }
+ 339             }
+ 340             
+ 341             renderNotesList();
+ 342             hideDeleteModal();
+ 343         }
+ 344 
+ 345         // Event Listeners
+ 346         newNoteBtn.addEventListener('click', createNewNote);
+ 347         noteTitle.addEventListener('input', () => {
+ 348             updateCurrentNote();
+ 349             updateCharCount();
+ 350         });
+ 351         noteContent.addEventListener('input', () => {
+ 352             updateCurrentNote();
+ 353             updateCharCount();
+ 354         });
+ 355         cancelDelete.addEventListener('click', hideDeleteModal);
+ 356         confirmDelete.addEventListener('click', () => {
+ 357             if (deleteNoteId) {
+ 358                 deleteNote(deleteNoteId);
+ 359             }
+ 360         });
+ 361 
+ 362         // Close modal on outside click
+ 363         deleteModal.addEventListener('click', (e) => {
+ 364             if (e.target === deleteModal) {
+ 365                 hideDeleteModal();
+ 366             }
+ 367         });
+ 368 
+ 369         // Keyboard shortcuts
+ 370         document.addEventListener('keydown', (e) => {
+ 371             // Ctrl/Cmd + N for new note
+ 372             if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
+ 373                 e.preventDefault();
+ 374                 createNewNote();
+ 375             }
+ 376         });
+ 377 
+ 378         // Initialize app
+ 379         init();
+ 380     </script>
+ 381 </body>
+ 382 </html>