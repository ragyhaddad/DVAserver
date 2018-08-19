var expression = {
upColor:'yellow',
genes: ['mmu:14804', 'mmu:13436', 'mmu:207596', 'mmu:20617', 'mmu:226413', 'mmu:381310', 'mmu:381310', 'mmu:240055', 'mmu:238276', 'mmu:545156', 'mmu:545156', 'mmu:100039795', 'mmu:100039795', 'mmu:19649', 'mmu:330319', 'mmu:628779', 'mmu:628779', 'mmu:12064', 'mmu:12319', 'mmu:12921', 'mmu:13591', 'mmu:13803', 'mmu:15898', 'mmu:16520', 'mmu:18545', 'mmu:11922', 'mmu:12794', 'mmu:12891', 'mmu:13799', 'mmu:18005', 'mmu:21828', 'mmu:26380', 'mmu:26938', 'mmu:26938', 'mmu:18508', 'mmu:27103', 'mmu:12971', 'mmu:51791', 'mmu:17181', 'mmu:22066', 'mmu:54698', 'mmu:58994', 'mmu:58994', 'mmu:64011', 'mmu:53902', 'mmu:106369', 'mmu:69993', 'mmu:69993', 'mmu:109620', 'mmu:67451', 'mmu:67468', 'mmu:67468', 'mmu:67516', 'mmu:67516', 'mmu:69642', 'mmu:71567', 'mmu:71760', 'mmu:74002', 'mmu:74020', 'mmu:78408', 'mmu:217371', 'mmu:75668', 'mmu:195733', 'mmu:64009', 'mmu:67803', 'mmu:207667', 'mmu:19229', 'mmu:232813', 'mmu:235599', 'mmu:108699', 'mmu:319582', 'mmu:329641', 'mmu:219257', 'mmu:219257', 'mmu:320265', 'mmu:68355', 'mmu:68355'],
conditions: [
{
	name : 'Genes of Interest',
	values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
}]
};
var proxy = function(url){return 'https://cors-anywhere.herokuapp.com/'+url;};
biojsviskegg.pathway('mmu04360').proxy(proxy).expression(expression).target(document.getElementById('keggViewer')).init();