
//canvas����
var canvas = document.getElementById('myCanvas');
var ctx    = canvas.getContext('2d');
//Ĭ�ϳ�ʼ��ϸ������
var percentage_livingcells = 20;

//����ϸ������
var cell_cellnum_inOneColume=100;
var cell_cellnum_inOneRow=100;
var cell = new Array();
var temp_cell = new Array();

//����
var paint_cell = function(){
	for (var i = 0; i < cell_cellnum_inOneColume; i++) {
		for (var j = 0; j < cell_cellnum_inOneRow; j++) {
			//ϸ��Ϊ��
			if (cell[i][j] == 1) {
				ctx.beginPath();
				ctx.arc(j * 5 + 2.5, i * 5 + 2.5, 2.5, 0, 360, false);
				//�����ɫ
				ctx.fillStyle="#009700";
				//��ʵ��Բ
				ctx.fill();
				ctx.closePath();
			}
			else if (cell[i][j] == -0.5) {
				ctx.beginPath();
				ctx.arc(j * 5 + 2.5, i * 5 + 2.5, 2.5, 0, 360, false);
				//�����ɫ
				ctx.fillStyle="#400000";
				//��ʵ��Բ
				ctx.fill();
				ctx.closePath();
			}
			//ϸ��Ϊ��
			else {
				cell[i][j] = 0;
				ctx.fillStyle='#FFFFFF';
				ctx.fillRect(j * 5, i * 5, (j + 1) * 5, (i + 1) * 5);
			};
		}
	}
}

//������ɳ�ʼϸ������״̬
var random_fate = function(){
	for (var i = 0; i < cell_cellnum_inOneColume; i++) {
		cell[i] = new Array();
	};
	for (var i = 0; i < cell_cellnum_inOneColume; i++) {
		temp_cell[i] = new Array();
	};
	//�趨��Ե��������ϸ����Ϊ��
	for (var i = 0; i < cell_cellnum_inOneColume; i++) {
		cell[i][0] = cell[i][1] = cell[i][cell_cellnum_inOneRow - 2] = cell[i][cell_cellnum_inOneRow - 1] = 0
	};
	for (var j = 0; j < cell_cellnum_inOneRow; j++) {
		cell[0][j] = cell[1][j] = cell[cell_cellnum_inOneColume - 2][j] = cell[cell_cellnum_inOneColume - 1][j] = 0
	};
	//����м�ϸ������״̬
	for (var i = 2; i < cell_cellnum_inOneColume - 2; i++) {
		for (var j = 2; j < cell_cellnum_inOneRow - 2; j++) {
			//��ʼϸ��״̬
			cell[i][j] = parseInt((100/percentage_livingcells) * Math.random());
			//��
			if(cell[i][j] == 0){
				cell[i][j] = 1;
			}
			//��
			else{
				cell[i][j] = 0;
			}
		}
	}
	paint_cell();
}

//������Χ��ϸ������
var count_aroundlivingcells = function (i, j) { 
	var num_aroundlivingcells = 0;
	num_aroundlivingcells = Math.ceil(cell[i - 1][j]) + Math.ceil(cell[i - 2][j]) + Math.ceil(cell[i + 1][j]) + Math.ceil(cell[i + 2][j]) + Math.ceil(cell[i][j - 1]) + Math.ceil(cell[i][j - 2]) + Math.ceil(cell[i][j + 1]) + Math.ceil(cell[i][j + 2]);
	return num_aroundlivingcells;
}

//����ϸ��״̬����ʾ
var refresh_fate = function () {
	var num_aroundlivingcells = 0;
	for (var i = 2; i < cell_cellnum_inOneColume - 2; i++) {
		for (var j = 2; j < cell_cellnum_inOneRow - 2; j++) {
			num_aroundlivingcells = count_aroundlivingcells(i, j);
			if (num_aroundlivingcells == 3) {
				temp_cell[i][j] = 1;
			}
			else if (num_aroundlivingcells == 2) {
				temp_cell[i][j] = cell[i][j];
			}
			else {
				temp_cell[i][j] = 0;
			};
			
		}
	}
	//����ϸ��״̬
	for (var i = 0; i < cell_cellnum_inOneColume; i++) {
		for (var j = 0; j < cell_cellnum_inOneRow; j++) {
			if (cell[i][j] != -0.5) {
			cell[i][j] = temp_cell[i][j];				
			};

		}
	}
	//ˢ����ʾ
	paint_cell();
}

//�ı����ʱ����
var flag_hasInitialed = 0;
var flag_firstclick = 0;
var fun_interval;
var start_or_change_interval = function () {
	if(flag_hasInitialed == 1){
		//�����״θ���
		if (flag_firstclick == 1) {
			//����Ѵ���ʱ���ظ�����
			clearInterval(fun_interval);
		};
		//������ǺϷ�����
		if (!isNaN(document.getElementById("interval").value) && document.getElementById("interval").value.length != 0) {
			var interval = document.getElementById("interval").value;
			fun_interval = setInterval(refresh_fate, interval);
		}
		//�����Ƿ�����������
		else {
			fun_interval = setInterval(refresh_fate, 200);
		}
		flag_firstclick = 1;
	}

}

//��ͣ����
var pause_interval = function () {
	if (flag_firstclick == 1) {
		clearInterval(fun_interval);
		flag_firstclick = 0;
	}

};

//��ȡ���myCanvas���������
var positionObj = function (event){
	var point = {
		x:0,
		y:0
	};
	point.x = event.clientX - 400;
	point.y = event.clientY - 200;
	// if(point.x >= 0 && point.y >= 0){
	// 	alert("X ����: " + point.x + ", Y ����: " + point.y)
	// }
    return point;
}

//����ǽ��
canvas.onmousedown = function () {
	var point = positionObj(event);
	var i = Math.floor(parseInt(point.y)/5);
	var j = Math.floor(parseInt(point.x)/5);
	if (cell[i][j] != -0.5) {
		cell[i][j] = -0.5;
	}
	else {
		cell[i][j] = 0;
	}
	paint_cell();
}

//��ʼ��
var initial = function () {
	flag_hasInitialed = 1;
	//�����״θ���	
	if (flag_firstclick == 1) {
		//����Ѵ���ʱ���ظ�����
		clearInterval(fun_interval);
		flag_firstclick = 0;
	};
	//�ж��Ƿ���Ļ�ϸ���ٷֱ�
	if (!isNaN(document.getElementById("percentage_livingcells").value) && document.getElementById("percentage_livingcells").value.length != 0) {
		percentage_livingcells = parseInt(document.getElementById("percentage_livingcells").value);
		if(percentage_livingcells <= 0 || percentage_livingcells > 100){
			percentage_livingcells = 20;
		}
	}
	else {
		percentage_livingcells = 20;
	};
    //�ж��Ƿ��������
	if (!isNaN(document.getElementById("cellnum_inOneColume").value) && document.getElementById("cellnum_inOneColume").value.length != 0) {
		cell_cellnum_inOneColume = parseInt(document.getElementById("cellnum_inOneColume").value);
	}
	else {
		cell_cellnum_inOneColume = 100;
	};
	//�ж��Ƿ��������
	if (!isNaN(document.getElementById("cellnum_inOneRow").value) && document.getElementById("cellnum_inOneRow").value.length != 0) {
		cell_cellnum_inOneRow = parseInt(document.getElementById("cellnum_inOneRow").value);
	}
	else {
		cell_cellnum_inOneRow = 100;
	};

	//��ʼ��
	canvas.setAttribute("width", cell_cellnum_inOneRow * 5);
	canvas.setAttribute("height", cell_cellnum_inOneColume * 5);
	random_fate();
}

