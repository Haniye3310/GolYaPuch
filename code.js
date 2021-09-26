var golyapuch={
	winScore:10,
	user:{goal:null,turn:false,score:0,win:false},
	pc:{goal:null,turn:false,score:0,win:false},
	input:function(a){
		switch(a){
			case 'next':
				this.scoreUpdater();
				break;
			case 'start':
				this.start();
				this.scoreUpdater();
				break;
			case 'restart':
				this.restart();
				this.start();
				this.scoreUpdater();
				break;
			case 'pcLeftHand':
				if(this.getTurn() !='pc')return false;
				if(this.user.goal)return false;
				this.user.goal = 'left';
				break;
			case 'pcRightHand':
				if(this.getTurn() !='pc')return false;
				if(this.user.goal)return false;
				this.user.goal = 'right';
				break;
			case 'userLeftHand':
				if(this.getTurn() !='user')return false;
				if(this.user.goal)return false;
				this.user.goal='left';
				this.pcSelect();
				break;
			case 'userRightHand':
				if(this.getTurn() !='user')return false;
				if(this.user.goal)return false;
				this.user.goal='right';
				this.pcSelect();
				break;
			default:
		}
		if(this.pc.turn){
			this.pcSelect();
		}
		this.winOrLose();
		this.monitorUpdater();
		return true;
	},
	winOrLose: function(){
		if(this.user.score>=this.winScore){
			alert('you win:)');
			this.input('restart');
		}
		if(this.pc.score>=this.winScore){
			alert('you lose:(');
			this.input('restart');
		}		
		var turn=this.getTurn();
		if(!this.user.goal)return false;
		if(!this.pc.goal)return false;
		switch(turn){
			case 'user':
				if(this.user.goal==this.pc.goal){
					this.pc.score++;
					this.pc.win=true;
					}else{
						this.user.score++;
						this.pc.win=false;
					}
				break;
			case 'pc':
				if(this.user.goal==this.pc.goal){
					this.user.score++;
					this.user.win=true;
					}else{
						this.pc.score++;
						this.user.win=false;
					}
				break;
			default:
				return false;
		}
		return true;
	},
	nextStep: function(){
		var turn=this.getTurn();
		if(!this.user.goal)return false;
		if(!this.pc.goal)return false;
		switch(turn){
			case 'user':
				if(this.pc.win){
					this.user.turn=false;
					this.pc.turn=true;
					this.user.goal=null;
					this.pc.goal=null;
				}else{
					this.user.turn=true;
					this.pc.turn=false;
					this.user.goal=null;
					this.pc.goal=null;
				}
				break;
			case 'pc':
				if(this.user.win){
					this.user.turn=true;
					this.pc.turn=false;
					this.user.goal=null;
					this.pc.goal=null;
				}else{
					this.user.turn=false;
					this.pc.turn=true;
					this.user.goal=null;
					this.pc.goal=null;
				}				
				break;
			default:
				return false;
		}
		this.input('next');
		return true;	
	},
	getTurn: function(){
		if(this.pc.turn)return 'pc';
		if(this.user.turn)return 'user';
		return null;
	},
	start: function(){
		var random= Math.round((Math.random()*2)-0.5);
		if(random>=1.5)random=1;
		if(random<=-0.5)random=0;
		if(random==1){
			this.user.turn=true;
			this.pc.turn=false;
			}else{
				this.user.turn=false;
				this.pc.turn=true;
			}
	},
	restart:function(){
		this.user={goal:null,turn:false,score:0};
		this.pc={goal:null,turn:false,score:0};
	},
	pcSelect: function(){
		var select=Array('left','right');
		var random=(Math.random()*2)-0.5;
		var random= Math.round(random);
		if(random>=1.5)random=1;
		if(random<=-0.5)random=0;
		if(!this.pc.turn){
			this.goalSelect(this.pc,select[random]);
			}else{
				this.pc.goal=select[random];
			}
		return true;
	},
	goalSelect:function(ob,select){
		if(select!='left' && select!='right')return false;
		if(!ob)return false;
		ob.goal=select;
		return true;
	},
	userLeftHand :function(a){
		var backgroundBisque='background-color:bisque;';
		switch(a){
			case 'open':
				document.getElementById('userLeftHandF1').style='top:-60px;'+backgroundBisque;
				document.getElementById('userLeftHandF2').style='top:-80px;'+backgroundBisque;
				document.getElementById('userLeftHandF3').style='top:-105px;'+backgroundBisque;
				document.getElementById('userLeftHandF4').style='top:-80px;'+backgroundBisque;
				document.getElementById('userLeftHandF5').style='left:-70px;'+backgroundBisque;
				break;
			case 'close':
				document.getElementById('userLeftHandF1').style='';
				document.getElementById('userLeftHandF2').style='';
				document.getElementById('userLeftHandF3').style='';
				document.getElementById('userLeftHandF4').style='';
				document.getElementById('userLeftHandF5').style='';
				break;
			default:return false;
		}
		return true;
	},
	userRightHand :function(a){
		var backgroundBisque='background-color:bisque;';
		switch(a){
			case 'open':
				document.getElementById('userRightHandF1').style='top:-60px;'+backgroundBisque;
				document.getElementById('userRightHandF2').style='top:-80px;'+backgroundBisque;
				document.getElementById('userRightHandF3').style='top:-105px;'+backgroundBisque;
				document.getElementById('userRightHandF4').style='top:-80px;'+backgroundBisque;
				document.getElementById('userRightHandF5').style='Right:-70px;'+backgroundBisque;
				break;
			case 'close':
				document.getElementById('userRightHandF1').style='';
				document.getElementById('userRightHandF2').style='';
				document.getElementById('userRightHandF3').style='';
				document.getElementById('userRightHandF4').style='';
				document.getElementById('userRightHandF5').style='';
				break;
			default:return false;
		}
		return true;
	},
	pcLeftHand :function(a){
		var backgroundBisque='background-color:bisque;';
		switch(a){
			case 'open':
				document.getElementById('pcLeftHandF1').style='bottom:-60px;'+backgroundBisque;
				document.getElementById('pcLeftHandF2').style='bottom:-80px;'+backgroundBisque;
				document.getElementById('pcLeftHandF3').style='bottom:-105px;'+backgroundBisque;
				document.getElementById('pcLeftHandF4').style='bottom:-80px;'+backgroundBisque;
				document.getElementById('pcLeftHandF5').style='left:-70px;'+backgroundBisque;
				break;
			case 'close':
				document.getElementById('pcLeftHandF1').style='';
				document.getElementById('pcLeftHandF2').style='';
				document.getElementById('pcLeftHandF3').style='';
				document.getElementById('pcLeftHandF4').style='';
				document.getElementById('pcLeftHandF5').style='';
				break;
			default:return false;
		}
		return true;
	},
	pcRightHand :function(a){
		var backgroundBisque='background-color:bisque;';
		switch(a){
			case 'open':
				document.getElementById('pcRightHandF1').style='bottom:-60px;'+backgroundBisque;
				document.getElementById('pcRightHandF2').style='bottom:-80px;'+backgroundBisque;
				document.getElementById('pcRightHandF3').style='bottom:-105px;'+backgroundBisque;
				document.getElementById('pcRightHandF4').style='bottom:-80px;'+backgroundBisque;
				document.getElementById('pcRightHandF5').style='right:-70px;'+backgroundBisque;
				break;
			case 'close':
				document.getElementById('pcRightHandF1').style='';
				document.getElementById('pcRightHandF2').style='';
				document.getElementById('pcRightHandF3').style='';
				document.getElementById('pcRightHandF4').style='';
				document.getElementById('pcRightHandF5').style='';
				break;
			default:return false;
		}
		return true;
	},
	scoreUpdater: function(){
		document.getElementById('pcScore').innerHTML=this.pc.score;
		document.getElementById('userScore').innerHTML=this.user.score;
	},
	monitorUpdater:function(){
		switch(this.getTurn()){
			case 'user':
				this.pcLeftHand('close');
				this.pcRightHand('close');
				document.getElementById('pcLeftHand').style='opacity:0.1;cursor:default;';
				document.getElementById('pcRightHand').style='opacity:0.1;cursor:default;';
				document.getElementById('userLeftHand').style='';
				document.getElementById('userRightHand').style='';
				if(!this.user.goal){
					this.userLeftHand('open');
					this.userRightHand('open');
					document.getElementById('userRightHandGoal').style='';
					document.getElementById('userLeftHandGoal').style='';
				}
				if(this.user.goal == 'right'){
					document.getElementById('userRightHandGoal').style='display:block';
					this.userLeftHand('close');
					this.userRightHand('close');
				}
				if(this.user.goal == 'left'){
					document.getElementById('userLeftHandGoal').style='display:block';
					this.userLeftHand('close');
					this.userRightHand('close');
				}
				if(this.pc.goal=='left'){
					document.getElementById('pcAlerts').innerHTML='thinking...';
					setTimeout(function(){
						document.getElementById('pcAlerts').innerHTML='left?';
						golyapuch.userLeftHand('open');
						setTimeout(function(){
							if(golyapuch.pc.win){
								document.getElementById('pcAlerts').innerHTML='i win:)';
								golyapuch.nextStep();
								document.getElementById('userRightHandGoal').style='';
								document.getElementById('userLeftHandGoal').style='';
								}else{
									document.getElementById('pcAlerts').innerHTML=':(';
									golyapuch.nextStep();
									document.getElementById('userRightHandGoal').style='';
									document.getElementById('userLeftHandGoal').style='';
								}
								setTimeout(function(){document.getElementById('pcAlerts').innerHTML='';},3000);
						},3000);
					},7000);
				}
				if(this.pc.goal=='right'){
					document.getElementById('pcAlerts').innerHTML='thinking...';
					setTimeout(function(){
						document.getElementById('pcAlerts').innerHTML='right?';
						golyapuch.userRightHand('open');
						setTimeout(function(){
							if(golyapuch.pc.win){
								document.getElementById('pcAlerts').innerHTML='i win:)';
								golyapuch.nextStep();
								document.getElementById('userRightHandGoal').style='';
								document.getElementById('userLeftHandGoal').style='';
								}else{
									document.getElementById('pcAlerts').innerHTML=':(';
									golyapuch.nextStep();
									document.getElementById('userRightHandGoal').style='';
									document.getElementById('userLeftHandGoal').style='';
								}
								setTimeout(function(){document.getElementById('pcAlerts').innerHTML='';},3000);
						},3000);
					},7000);
				}
				break;
			case 'pc':
				this.userLeftHand('close');
				this.userRightHand('close');
				document.getElementById('userLeftHand').style='opacity:0.1;cursor:default;';
				document.getElementById('userRightHand').style='opacity:0.1;cursor:default;';
				document.getElementById('pcLeftHand').style='';
				document.getElementById('pcRightHand').style='';
				document.getElementById('userRightHandGoal').style='';
				document.getElementById('userLeftHandGoal').style='';
				if(!this.user.goal){
					this.pcLeftHand('close');
					this.pcRightHand('close');
					document.getElementById('pcLeftHandGoal').style='';
					document.getElementById('pcRightHandGoal').style='';
				}
				if(this.user.goal == 'left'){
					this.pcLeftHand('open');
					if(this.user.win){
						document.getElementById('pcLeftHandGoal').style='display:block';
						setTimeout(function(){
							golyapuch.nextStep();
							document.getElementById('pcLeftHandGoal').style='';
							document.getElementById('pcRightHandGoal').style='';
						},4000);
					}else{
						setTimeout(function(){
							golyapuch.pcRightHand('open');
							document.getElementById('pcRightHandGoal').style='display:block';
							setTimeout(function(){
								golyapuch.nextStep();
								document.getElementById('pcLeftHandGoal').style='';
								document.getElementById('pcRightHandGoal').style='';
							},4000);							
						},4000);
					}
				}
				if(this.user.goal == 'right'){
					this.pcRightHand('open');
					if(this.user.win){
						document.getElementById('pcRightHandGoal').style='display:block';
						setTimeout(function(){
							golyapuch.nextStep();
							document.getElementById('pcLeftHandGoal').style='';
							document.getElementById('pcRightHandGoal').style='';
						},4000);
					}else{
						setTimeout(function(){
							golyapuch.pcLeftHand('open');
							document.getElementById('pcLeftHandGoal').style='display:block';
							setTimeout(function(){
								golyapuch.nextStep();
								document.getElementById('pcLeftHandGoal').style='';
								document.getElementById('pcRightHandGoal').style='';
							},4000);							
						},4000);
					}					
				}
				break;
			default:
				document.getElementById('userLeftHand').style='';
				document.getElementById('userRightHand').style='';
				document.getElementById('pcLeftHand').style='';
				document.getElementById('pcRightHand').style='';
				document.getElementById('userRightHandGoal').style='';
				document.getElementById('userLeftHandGoal').style='';
				alert('bug!');
		}
		
	},
}
golyapuch.input('start');